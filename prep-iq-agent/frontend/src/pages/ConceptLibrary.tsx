import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import prepiqLogo from "@/assets/prepiq-logo.jpg";
import modulesData from "@/data/modules.json";

type SubjectType = "Physics" | "Chemistry" | "Biology" | "Mathematics";

const ConceptLibrary = () => {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState<SubjectType>("Physics");

  const subjects: SubjectType[] = ["Physics", "Chemistry", "Biology", "Mathematics"];

  const subjectColors = {
    Physics: "bg-blue-500 hover:bg-blue-600 border-blue-500",
    Chemistry: "bg-green-500 hover:bg-green-600 border-green-500",
    Biology: "bg-amber-500 hover:bg-amber-600 border-amber-500",
    Mathematics: "bg-purple-500 hover:bg-purple-600 border-purple-500",
  };

  const subjectIcons = {
    Physics: "⚡",
    Chemistry: "🧪",
    Biology: "🧬",
    Mathematics: "📐",
  };

  const handleModuleClick = (videoUrl: string) => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  const modules = modulesData[activeSubject];
  const moduleEntries = Object.entries(modules);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img
            src={prepiqLogo}
            alt="PrepIQ Logo"
            className="w-10 h-10 rounded-lg"
          />
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Concept Library
            </h1>
            <p className="text-sm text-muted-foreground">
              Video tutorials for all subjects
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Subject Tabs */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-wrap gap-3 justify-center">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setActiveSubject(subject)}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-md ${
                  activeSubject === subject
                    ? `${subjectColors[subject]} ring-4 ring-offset-2 ring-primary/30 scale-105`
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                <span className="text-xl mr-2">{subjectIcons[subject]}</span>
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Module Count Banner */}
        <div className="mb-6 text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card className="inline-block px-6 py-3 bg-accent/50">
            <p className="text-sm font-semibold">
              <span className="text-2xl mr-2">{subjectIcons[activeSubject]}</span>
              {moduleEntries.length} modules available in {activeSubject}
            </p>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleEntries.map(([moduleName, videoUrl], index) => (
            <Card
              key={moduleName}
              className="group p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-card border-2 border-border hover:border-primary animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => handleModuleClick(videoUrl)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {moduleName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click to watch tutorial
                  </p>
                </div>
                <div className="ml-3 p-2 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>

              {/* YouTube indicator */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="font-medium">YouTube Tutorial</span>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Bottom Info Card */}
        <Card className="mt-12 p-6 bg-accent/50 border-primary/20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Study Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Watch videos at 1.25x or 1.5x speed to save time</li>
                <li>• Take notes while watching to reinforce learning</li>
                <li>• Pause and practice problems before moving to the next topic</li>
                <li>• Revisit difficult concepts multiple times</li>
              </ul>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ConceptLibrary;
