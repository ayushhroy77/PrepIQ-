import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Calendar, Target, TrendingUp, Sparkles, MessageSquare, Star } from "lucide-react";
import { Link } from "react-router-dom";
import prepiqLogo from "@/assets/prepiq-logo.jpg";
import studyBackground from "@/assets/study-background.jpg";
import studyElementsOverlay from "@/assets/study-elements-overlay.png";
import examLogos from "@/assets/exam-logos.png";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import stepProfile from "@/assets/step-profile.jpg";
import stepAnalyze from "@/assets/step-analyze.jpg";
import stepSucceed from "@/assets/step-succeed.jpg";
import student1 from "@/assets/student-1.jpg";
import student2 from "@/assets/student-2.jpg";
import student3 from "@/assets/student-3.jpg";
import featureExplanations from "@/assets/feature-explanations.jpg";
import featureQuizzes from "@/assets/feature-quizzes.jpg";
import featureScheduling from "@/assets/feature-scheduling.jpg";
import featureTracking from "@/assets/feature-tracking.jpg";
import featureExams from "@/assets/feature-exams.jpg";
import featureBuddy from "@/assets/feature-buddy.jpg";

const Landing = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const features = [
    {
      icon: Brain,
      image: featureExplanations,
      title: "Intelligent Explanations",
      description: "Complex concepts explained in simple terms, adapted to your learning level",
      details: "PrepIQ breaks down challenging topics into clear, digestible explanations tailored to your level. Get instant clarity on difficult concepts with step-by-step reasoning and relatable examples.",
      cta: "Try Explanations"
    },
    {
      icon: Target,
      image: featureQuizzes,
      title: "Adaptive Quizzes",
      description: "AI-generated quizzes that adjust difficulty based on your performance",
      details: "Unlimited practice questions that evolve with your progress. The AI identifies weak areas and adjusts difficulty in real-time, maximizing study efficiency and turning weaknesses into strengths.",
      cta: "Start Quiz"
    },
    {
      icon: Calendar,
      image: featureScheduling,
      title: "Smart Scheduling",
      description: "Personalized study schedules that optimize your learning efficiency",
      details: "AI-powered schedules based on your exam date, knowledge level, and availability. Uses spaced repetition and adapts dynamically to keep you on track without burnout.",
      cta: "Create Schedule"
    },
    {
      icon: TrendingUp,
      image: featureTracking,
      title: "Progress Tracking",
      description: "Real-time analytics to monitor improvement and identify weak areas",
      details: "Comprehensive insights with detailed analytics across topics and difficulty levels. Visualize strengths, identify patterns, and get AI recommendations on what to study next.",
      cta: "View Analytics"
    },
    {
      icon: Sparkles,
      image: featureExams,
      title: "Multi-Exam Support",
      description: "Comprehensive preparation for JEE, NEET, UPSC, CAT, GATE, and more",
      details: "Specialized modules for all major competitive exams. Access exam-specific practice papers, previous year questions, and strategies tailored to your target exam's format.",
      cta: "Explore Exams"
    },
    {
      icon: MessageSquare,
      image: featureBuddy,
      title: "AI Study Buddy",
      description: "24/7 intelligent companion that remembers your journey and guides you",
      details: "Your personal AI companion available 24/7. Remembers your learning history, answers doubts contextually, and provides motivation—like having an expert tutor and friend combined.",
      cta: "Meet Your Buddy"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      exam: "JEE Aspirant",
      image: student1,
      rating: 5,
      text: "PrepIQ's AI explanations made complex physics concepts so easy to understand. My mock test scores improved by 40% in just 2 months!"
    },
    {
      name: "Rahul Verma",
      exam: "NEET Preparation",
      image: student2,
      rating: 5,
      text: "The adaptive quizzes are game-changing! They focus exactly on my weak areas. I feel so much more confident now."
    },
    {
      name: "Ananya Patel",
      exam: "CAT 2024",
      image: student3,
      rating: 5,
      text: "Having an AI study buddy that remembers my progress and motivates me 24/7 has been incredible. Best study companion ever!"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src={prepiqLogo} alt="PrepIQ Logo" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold">PrepIQ</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-primary hover:opacity-90">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${studyBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url(${studyElementsOverlay})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Your Intelligent Path to
            <span className="text-gradient block mt-2">Exam Success</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            PrepIQ is an autonomous AI agent that thinks, plans, and acts as your personal study companion. 
            Get personalized explanations, adaptive quizzes, and smart scheduling—all powered by advanced AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-8">
                Start Learning Free
              </Button>
            </Link>
          </div>

          <div className="mt-16 relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card rounded-2xl p-4 max-w-5xl mx-auto shadow-xl">
              <img 
                src={dashboardPreview} 
                alt="PrepIQ Dashboard Preview" 
                className="rounded-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Exam Logos Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/50 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-8">Trusted by students preparing for</p>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-x">
              <img 
                src={examLogos} 
                alt="Supported competitive exams including JEE, NEET, UPSC, CAT, GATE" 
                className="h-32 object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
              <img 
                src={examLogos} 
                alt="Supported competitive exams" 
                className="h-32 object-contain opacity-60 hover:opacity-100 transition-opacity ml-12"
              />
              <img 
                src={examLogos} 
                alt="Supported competitive exams" 
                className="h-32 object-contain opacity-60 hover:opacity-100 transition-opacity ml-12"
              />
              <img 
                src={examLogos} 
                alt="Supported competitive exams" 
                className="h-32 object-contain opacity-60 hover:opacity-100 transition-opacity ml-12"
              />
              <img 
                src={examLogos} 
                alt="Supported competitive exams" 
                className="h-32 object-contain opacity-60 hover:opacity-100 transition-opacity ml-12"
              />
              <img 
                src={examLogos} 
                alt="Supported competitive exams" 
                className="h-32 object-contain opacity-60 hover:opacity-100 transition-opacity ml-12"
              />
              <img 
                src={examLogos} 
                alt="Supported competitive exams" 
                className="h-32 object-contain opacity-60 hover:opacity-100 transition-opacity ml-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Autonomous AI That <span className="text-gradient">Actually Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              PrepIQ doesn't just answer questions—it reasons, plans, and executes real tasks to accelerate your learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group p-0 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-card border-border animate-fade-in opacity-0 relative"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-6 text-center">
                    <feature.icon className="w-12 h-12 text-primary mb-4 transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
                    <p className="text-sm text-foreground transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                      {feature.details}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all duration-300">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              How PrepIQ <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and experience the power of AI-driven learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { image: stepProfile, title: "Create Your Profile", desc: "Tell us about your target exams and learning goals" },
              { image: stepAnalyze, title: "AI Analyzes & Plans", desc: "Our autonomous agent creates your personalized study roadmap" },
              { image: stepSucceed, title: "Learn & Succeed", desc: "Chat with AI, take adaptive quizzes, and track your progress" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in opacity-0" 
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto mb-6 shadow-glow hover:scale-110 transition-transform duration-300">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-background scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Loved by <span className="text-gradient">Thousands of Students</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what students are saying about their PrepIQ experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-8 bg-card border-border animate-fade-in opacity-0 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.exam}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed italic">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12 shadow-xl">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Transform Your <span className="text-gradient">Study Journey?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who are acing their exams with PrepIQ's intelligent AI companion
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-10">
                Get Started for Free
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">No credit card required • Free forever</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img src={prepiqLogo} alt="PrepIQ Logo" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-bold">PrepIQ</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 PrepIQ. Built for Agentverse Hackathon. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;