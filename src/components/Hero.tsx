"use client"

import type { Portfolio } from "../types"

interface HeroProps {
  data?: Portfolio
}

const Hero = ({ data }: HeroProps) => {
  const defaultData: Portfolio = {
    name: "Leandro Adriel",
    title: "Full Stack Developer",
    description: "Passionate developer creating innovative solutions",
    email: "adrielperez227@gmail.com",
    phone: "+1234567890",
    location: "Tu Ciudad",
    website: "https://tuportafolio.com",
    social: {
      github: "https://github.com/tuusuario",
      linkedin: "https://linkedin.com/in/tuusuario",
      twitter: "https://twitter.com/tuusuario",
    },
    bio: "Passionate about creating innovative digital experiences that blend thoughtful design with robust engineering.",
    experience: 3,
    education: [],
    certifications: [],
    languages: [],
    interests: [],
  }

  const heroData = data || defaultData

  return (
    <section id="home" className="min-h-screen flex items-center section-padding">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <p className="text-primary font-mono text-sm tracking-wider">Hi, my name is</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                {heroData.name}
              </h1>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text leading-tight">
                {heroData.title}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">{heroData.bio}</p>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 glass-effect px-4 py-2 rounded-lg">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {heroData.location}
              </div>
              <div className="flex items-center gap-2 glass-effect px-4 py-2 rounded-lg">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {heroData.experience}+ years experience
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:-translate-y-0.5"
              >
                View My Work
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 glass-effect text-foreground rounded-lg font-medium hover:bg-muted transition-all duration-300 hover:-translate-y-0.5"
              >
                Get In Touch
              </button>
            </div>
          </div>

          <div className="relative scale-in">
            <div className="w-full h-96 glass-effect-strong rounded-2xl flex items-center justify-center relative overflow-hidden group">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-gradient-shift" />

              {/* Content */}
              <div className="text-8xl relative z-10 transition-transform duration-500 group-hover:scale-110">👨‍💻</div>

              {/* Floating particles */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float" />
              <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-secondary rounded-full animate-float-slow" />
              <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent rounded-full animate-float-slower" />
            </div>

            {/* Floating orbs with enhanced glow */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse-slow" />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-accent/20 rounded-full blur-2xl animate-pulse-slow" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
