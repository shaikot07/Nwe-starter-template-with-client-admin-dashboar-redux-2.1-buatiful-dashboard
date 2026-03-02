import React from "react";

export default function HeroSection() {
  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Master a New Language With Authority and Insight.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experience the transformation from language learning to cognitive
              mastery. Expert guidance, deep understanding.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="px-8 py-3 bg-accent text-white rounded-full hover:opacity-90 transition font-bold">
                EXPLORE COURSES
              </button>
              <button className="px-8 py-3 border-2 border-foreground text-foreground rounded-full hover:bg-foreground hover:text-white transition font-bold">
                REQUEST CONSULTATION
              </button>
            </div>
          </div>

          {/* Right - Profile Card */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-96 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
                  alt="Dr. Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-6 right-6 bg-white px-4 py-3 rounded-lg shadow-lg">
                <p className="font-bold text-sm text-foreground">
                  Dr. Sarah Johnson's
                </p>
                <p className="text-xs text-gray-600">Teacher/Mentor</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
