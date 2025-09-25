"use client"

interface HeroProps {
  data?: {
    name: string
    title: string
    bio: string
    location: string
    experience: number
  }
}

const Hero = ({ data }: HeroProps) => {
  const defaultData = {
    name: "Tu Nombre",
    title: "Full Stack Developer",
    bio: "Passionate about creating innovative digital experiences that blend thoughtful design with robust engineering.",
    location: "Tu Ciudad",
    experience: 3,
  }

  const heroData = data || defaultData

  return (
    <section id="home" className="min-h-screen flex items-center section-padding">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-mono text-sm">Hi, my name is</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">{heroData.name}</h1>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-muted-foreground">{heroData.title}</h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">{heroData.bio}</p>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                View My Work
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
              <div className="text-6xl">👨‍💻</div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
