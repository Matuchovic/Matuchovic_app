import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { ScrollStory } from '@/components/sections/ScrollStory'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { StatementSection } from '@/components/sections/StatementSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <HeroSection />
      <div className="section-divider" />
      <ScrollStory />
      <div className="section-divider" />
      <ServicesSection />
      <div className="section-divider" />
      <ProjectsSection />
      <div className="section-divider" />
      <StatementSection />
      <div className="section-divider" />
      <ProcessSection />
      <div className="section-divider" />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  )
}
