from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import random


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Quiz Models
class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str

class QuizGenerateRequest(BaseModel):
    subject: str
    module: str
    exam_format: str
    difficulty: str
    num_questions: int

class QuizGenerateResponse(BaseModel):
    quiz_id: str
    subject: str
    module: str
    exam_format: str
    difficulty: str
    time_limit_minutes: int
    questions: List[QuizQuestion]

class DetailedAnswer(BaseModel):
    question_number: int
    question: str
    options: List[str]
    user_answer: Optional[str]
    correct_answer: str
    is_correct: bool
    was_bookmarked: bool

class QuizSubmitRequest(BaseModel):
    quiz_id: str
    user_id: str
    subject: str
    module: str
    exam_format: str
    difficulty: str
    total_questions: int
    answers: dict  # question_number: selected_answer
    bookmarked_questions: List[int]
    time_taken_seconds: int
    correct_answers: dict  # question_number: correct_answer

class QuizAttempt(BaseModel):
    attempt_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    quiz_id: str
    user_id: str
    subject: str
    module: str
    exam_format: str
    difficulty: str
    total_questions: int
    attempted_questions: int
    correct_answers: int
    score_percentage: float
    time_taken_seconds: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    detailed_answers: List[DetailedAnswer]

class BookmarkRequest(BaseModel):
    user_id: str
    question: str
    options: List[str]
    correct_answer: str
    subject: str
    module: str

class Bookmark(BaseModel):
    bookmark_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    question: str
    options: List[str]
    correct_answer: str
    subject: str
    module: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

# Mock quiz data generator
def generate_mock_quiz_data(subject: str, module: str, difficulty: str, num_questions: int) -> List[QuizQuestion]:
    """Generate mock quiz questions based on subject and module"""
    
    # Sample questions by subject
    question_bank = {
        "Physics": {
            "Thermodynamics": [
                {
                    "question": "What is the first law of thermodynamics?",
                    "options": ["Energy can be created", "Energy cannot be created or destroyed", "Heat flows from cold to hot", "Entropy always increases"],
                    "answer": "Energy cannot be created or destroyed"
                },
                {
                    "question": "In an isothermal process, which quantity remains constant?",
                    "options": ["Pressure", "Volume", "Temperature", "Entropy"],
                    "answer": "Temperature"
                },
                {
                    "question": "What does the Carnot cycle describe?",
                    "options": ["Ideal heat engine", "Real heat engine", "Refrigerator only", "Heat pump only"],
                    "answer": "Ideal heat engine"
                }
            ],
            "Mechanics": [
                {
                    "question": "What is Newton's second law of motion?",
                    "options": ["F = ma", "F = mv", "F = m/a", "F = a/m"],
                    "answer": "F = ma"
                },
                {
                    "question": "The SI unit of force is:",
                    "options": ["Joule", "Newton", "Watt", "Pascal"],
                    "answer": "Newton"
                }
            ]
        },
        "Chemistry": {
            "Physical Chemistry": [
                {
                    "question": "What is Avogadro's number?",
                    "options": ["6.022 × 10²³", "6.022 × 10²²", "3.14 × 10²³", "9.8 × 10²³"],
                    "answer": "6.022 × 10²³"
                },
                {
                    "question": "What is the pH of a neutral solution?",
                    "options": ["0", "7", "14", "1"],
                    "answer": "7"
                }
            ],
            "Organic Chemistry": [
                {
                    "question": "Which functional group is present in alcohols?",
                    "options": ["-OH", "-COOH", "-CHO", "-NH2"],
                    "answer": "-OH"
                }
            ]
        },
        "Biology": {
            "Cell Biology": [
                {
                    "question": "What is the powerhouse of the cell?",
                    "options": ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
                    "answer": "Mitochondria"
                },
                {
                    "question": "Which organelle is responsible for protein synthesis?",
                    "options": ["Ribosome", "Lysosome", "Chloroplast", "Vacuole"],
                    "answer": "Ribosome"
                }
            ],
            "Genetics": [
                {
                    "question": "What is the shape of DNA?",
                    "options": ["Single helix", "Double helix", "Triple helix", "Circular"],
                    "answer": "Double helix"
                }
            ]
        },
        "Maths": {
            "Algebra": [
                {
                    "question": "What is the value of x in the equation 2x + 5 = 15?",
                    "options": ["5", "10", "7.5", "2.5"],
                    "answer": "5"
                },
                {
                    "question": "What is the quadratic formula?",
                    "options": ["x = (-b ± √(b²-4ac))/2a", "x = -b/2a", "x = b²-4ac", "x = 2a/b"],
                    "answer": "x = (-b ± √(b²-4ac))/2a"
                }
            ],
            "Calculus": [
                {
                    "question": "What is the derivative of x²?",
                    "options": ["2x", "x", "x²", "2"],
                    "answer": "2x"
                }
            ]
        }
    }
    
    # Get questions for the subject and module
    questions = question_bank.get(subject, {}).get(module, [])
    
    # If not enough questions, generate generic ones
    while len(questions) < num_questions:
        questions.append({
            "question": f"Sample question {len(questions) + 1} for {module} in {subject}",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "Option A"
        })
    
    # Select random questions up to num_questions
    selected = random.sample(questions, min(num_questions, len(questions)))
    
    return [QuizQuestion(**q) for q in selected]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Quiz Endpoints
@api_router.post("/quiz/generate", response_model=QuizGenerateResponse)
async def generate_quiz(request: QuizGenerateRequest):
    """Generate a quiz based on subject, module, and difficulty"""
    try:
        # Generate mock quiz data
        questions = generate_mock_quiz_data(
            request.subject,
            request.module,
            request.difficulty,
            request.num_questions
        )
        
        # Calculate time limit based on exam format
        time_limits = {
            "JEE Main": 3,  # 3 minutes per question
            "JEE Advanced": 4,  # 4 minutes per question
            "NEET": 2.5,  # 2.5 minutes per question
            "General Practice": 2  # 2 minutes per question
        }
        
        time_per_question = time_limits.get(request.exam_format, 2)
        time_limit = int(request.num_questions * time_per_question)
        
        quiz_id = str(uuid.uuid4())
        
        return QuizGenerateResponse(
            quiz_id=quiz_id,
            subject=request.subject,
            module=request.module,
            exam_format=request.exam_format,
            difficulty=request.difficulty,
            time_limit_minutes=time_limit,
            questions=questions
        )
    except Exception as e:
        logger.error(f"Error generating quiz: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate quiz")

@api_router.post("/quiz/submit", response_model=QuizAttempt)
async def submit_quiz(request: QuizSubmitRequest):
    """Submit quiz and save attempt to database"""
    try:
        # Calculate score
        correct_count = 0
        attempted_count = len(request.answers)
        detailed_answers = []
        
        # Reconstruct questions from correct_answers
        for q_num in range(1, request.total_questions + 1):
            user_answer = request.answers.get(str(q_num))
            correct_answer = request.correct_answers.get(str(q_num))
            
            is_correct = user_answer == correct_answer if user_answer else False
            if is_correct:
                correct_count += 1
            
            detailed_answers.append(DetailedAnswer(
                question_number=q_num,
                question=f"Question {q_num}",  # Placeholder
                options=[],  # Placeholder
                user_answer=user_answer,
                correct_answer=correct_answer,
                is_correct=is_correct,
                was_bookmarked=q_num in request.bookmarked_questions
            ))
        
        score_percentage = (correct_count / request.total_questions * 100) if request.total_questions > 0 else 0
        
        attempt = QuizAttempt(
            quiz_id=request.quiz_id,
            user_id=request.user_id,
            subject=request.subject,
            module=request.module,
            exam_format=request.exam_format,
            difficulty=request.difficulty,
            total_questions=request.total_questions,
            attempted_questions=attempted_count,
            correct_answers=correct_count,
            score_percentage=score_percentage,
            time_taken_seconds=request.time_taken_seconds,
            detailed_answers=detailed_answers
        )
        
        # Save to database
        await db.quiz_attempts.insert_one(attempt.dict())
        
        return attempt
    except Exception as e:
        logger.error(f"Error submitting quiz: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit quiz")

@api_router.get("/quiz/history/{user_id}")
async def get_quiz_history(user_id: str, limit: int = 50):
    """Get quiz history for a user"""
    try:
        attempts = await db.quiz_attempts.find(
            {"user_id": user_id}
        ).sort("timestamp", -1).limit(limit).to_list(limit)
        
        return attempts
    except Exception as e:
        logger.error(f"Error fetching quiz history: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch quiz history")

@api_router.get("/quiz/analytics/{user_id}")
async def get_quiz_analytics(user_id: str):
    """Get analytics data for a user"""
    try:
        attempts = await db.quiz_attempts.find({"user_id": user_id}).to_list(1000)
        
        if not attempts:
            return {
                "total_quizzes": 0,
                "average_score": 0,
                "subject_performance": {},
                "score_trend": [],
                "weak_modules": []
            }
        
        # Calculate analytics
        total_quizzes = len(attempts)
        total_score = sum(a["score_percentage"] for a in attempts)
        average_score = total_score / total_quizzes
        
        # Subject-wise performance
        subject_performance = {}
        for attempt in attempts:
            subject = attempt["subject"]
            if subject not in subject_performance:
                subject_performance[subject] = {"total": 0, "score_sum": 0}
            subject_performance[subject]["total"] += 1
            subject_performance[subject]["score_sum"] += attempt["score_percentage"]
        
        for subject in subject_performance:
            subject_performance[subject]["average"] = (
                subject_performance[subject]["score_sum"] / subject_performance[subject]["total"]
            )
        
        # Score trend (last 10 attempts)
        score_trend = [
            {
                "date": a["timestamp"],
                "score": a["score_percentage"],
                "subject": a["subject"]
            }
            for a in sorted(attempts, key=lambda x: x["timestamp"])[-10:]
        ]
        
        # Weak modules (below 60% average)
        module_performance = {}
        for attempt in attempts:
            key = f"{attempt['subject']} - {attempt['module']}"
            if key not in module_performance:
                module_performance[key] = {"total": 0, "score_sum": 0}
            module_performance[key]["total"] += 1
            module_performance[key]["score_sum"] += attempt["score_percentage"]
        
        weak_modules = [
            {"module": key, "average_score": data["score_sum"] / data["total"]}
            for key, data in module_performance.items()
            if (data["score_sum"] / data["total"]) < 60
        ]
        
        return {
            "total_quizzes": total_quizzes,
            "average_score": round(average_score, 2),
            "subject_performance": subject_performance,
            "score_trend": score_trend,
            "weak_modules": weak_modules
        }
    except Exception as e:
        logger.error(f"Error fetching analytics: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch analytics")

@api_router.post("/quiz/bookmark", response_model=Bookmark)
async def add_bookmark(request: BookmarkRequest):
    """Add a bookmarked question"""
    try:
        bookmark = Bookmark(**request.dict())
        await db.bookmarks.insert_one(bookmark.dict())
        return bookmark
    except Exception as e:
        logger.error(f"Error adding bookmark: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to add bookmark")

@api_router.get("/quiz/bookmarks/{user_id}")
async def get_bookmarks(user_id: str):
    """Get bookmarked questions for a user"""
    try:
        bookmarks = await db.bookmarks.find({"user_id": user_id}).sort("timestamp", -1).to_list(100)
        return bookmarks
    except Exception as e:
        logger.error(f"Error fetching bookmarks: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch bookmarks")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
