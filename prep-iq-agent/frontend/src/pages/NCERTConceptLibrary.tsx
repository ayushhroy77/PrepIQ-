import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink, Play } from "lucide-react";
import prepiqLogo from "@/assets/prepiq-logo.jpg";
import modulesData from "@/data/modules.json";

type SubjectType = "Physics" | "Chemistry" | "Biology" | "Mathematics";

interface ModulesData {
  [key: string]: {
    [key: string]: string;
  };
}

const NCERTConceptLibrary = () => {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState<SubjectType>("Physics");

  const subjects: SubjectType[] = ["Physics", "Chemistry", "Biology", "Mathematics"];

  const subjectColors = {
    Physics: {
      bg: "bg-blue-500",
      hover: "hover:bg-blue-600",
      border: "border-blue-500",
      ring: "ring-blue-500/30",
      accent: "bg-blue-50 dark:bg-blue-950",
      text: "text-blue-700 dark:text-blue-300",
    },
    Chemistry: {
      bg: "bg-green-500",
      hover: "hover:bg-green-600",
      border: "border-green-500",
      ring: "ring-green-500/30",
      accent: "bg-green-50 dark:bg-green-950",
      text: "text-green-700 dark:text-green-300",
    },
    Biology: {
      bg: "bg-amber-500",
      hover: "hover:bg-amber-600",
      border: "border-amber-500",
      ring: "ring-amber-500/30",
      accent: "bg-amber-50 dark:bg-amber-950",
      text: "text-amber-700 dark:text-amber-300",
    },
    Mathematics: {
      bg: "bg-purple-500",
      hover: "hover:bg-purple-600",
      border: "border-purple-500",
      ring: "ring-purple-500/30",
      accent: "bg-purple-50 dark:bg-purple-950",
      text: "text-purple-700 dark:text-purple-300",
    },
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

  const modules = (modulesData as ModulesData)[activeSubject];
  const moduleEntries = Object.entries(modules || {});
  const currentColors = subjectColors[activeSubject];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <img
            src={prepiqLogo}
            alt="PrepIQ Logo"
            className="w-10 h-10 rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Concept Library
            </h1>
            <p className="text-sm text-muted-foreground">
              Comprehensive video tutorials for all subjects
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Subject Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {subjects.map((subject) => {
              const isActive = activeSubject === subject;
              const colors = subjectColors[subject];
              return (
                <button
                  key={subject}
                  onClick={() => setActiveSubject(subject)}
                  className={`
                    px-6 py-3 rounded-lg font-semibold text-white 
                    transition-all duration-300 transform hover:scale-105 
                    shadow-md relative overflow-hidden
                    ${isActive 
                      ? `${colors.bg} ${colors.hover} ring-4 ${colors.ring} ring-offset-2 scale-105 shadow-lg` 
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    }
                  `}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-xl">{subjectIcons[subject]}</span>
                    <span>{subject}</span>
                  </span>
                  {isActive && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Module Count Banner */}
        <div className="mb-6 text-center">
          <Card className={`inline-block px-6 py-3 ${currentColors.accent} border-2 ${currentColors.border}`}>
            <p className={`text-sm font-semibold ${currentColors.text} flex items-center justify-center gap-2`}>
              <span className="text-2xl">{subjectIcons[activeSubject]}</span>
              <span>{moduleEntries.length} modules available in {activeSubject}</span>
            </p>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {moduleEntries.map(([moduleName, videoUrl], index) => (
            <Card
              key={moduleName}
              className={`
                group p-5 hover:shadow-xl transition-all duration-300 
                hover:-translate-y-1 cursor-pointer bg-card border-2 
                border-border hover:border-primary/50 relative overflow-hidden
                ${currentColors.accent}
              `}
              style={{ 
                animationDelay: `${index * 0.03}s`,
                animation: "fadeIn 0.5s ease-in-out"
              }}
              onClick={() => handleModuleClick(videoUrl)}
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentColors.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className={`
                      text-base font-bold mb-2 group-hover:text-primary 
                      transition-colors line-clamp-2 ${currentColors.text}
                    `}>
                      {moduleName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Click to watch tutorial
                    </p>
                  </div>
                  <div className={`
                    ml-3 p-2 rounded-lg ${currentColors.bg} text-white 
                    group-hover:scale-110 transition-transform duration-300 
                    flex-shrink-0 shadow-md
                  `}>
                    <Play className="w-4 h-4" />
                  </div>
                </div>

                {/* YouTube indicator */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50">
                  <svg 
                    className="w-4 h-4 text-red-600 dark:text-red-400" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="font-medium">YouTube</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {moduleEntries.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No modules available</h3>
            <p className="text-sm text-muted-foreground">
              Modules for {activeSubject} will be available soon.
            </p>
          </Card>
        )}

        {/* Bottom Info Card */}
        <Card className={`mt-12 p-6 ${currentColors.accent} border-2 ${currentColors.border}`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${currentColors.bg} text-white flex-shrink-0`}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-lg font-bold mb-2 ${currentColors.text}`}>
                Study Tips
              </h3>
              <ul className={`text-sm ${currentColors.text} space-y-1 opacity-90`}>
                <li>• Watch videos at 1.25x or 1.5x speed to save time</li>
                <li>• Take notes while watching to reinforce learning</li>
                <li>• Pause and practice problems before moving to the next topic</li>
                <li>• Revisit difficult concepts multiple times</li>
              </ul>
            </div>
          </div>
        </Card>
      </main>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NCERTConceptLibrary;

