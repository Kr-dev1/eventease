"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"
import Image from "next/image"
import { NavbarDemo } from "@/components/navbar/navbar"
import { Button } from "@/components/ui/button"
import { CalendarDaysIcon, Sparkles, Users2, BarChart3 } from "lucide-react"

export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } })

    tl.fromTo(iconRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo(headingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5")
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.4")
      .fromTo(ctaRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, "-=0.4")
  }, [])

  return (
    <>

      <div className="relative w-full z-10">
        <NavbarDemo />

        <main className="relative z-10 flex flex-col items-center justify-center px-6 py-24 text-center min-h-[calc(100vh-64px)] bg-background bg-opacity-90">
          <div className="max-w-2xl">
            <div className="flex justify-center mb-6">
              <CalendarDaysIcon ref={iconRef} className="w-12 h-12 text-primary drop-shadow" />
            </div>

            <h1 ref={headingRef} className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Plan Events. Collect RSVPs. Stay Organized.
            </h1>

            <p ref={subRef} className="text-muted-foreground text-lg md:text-xl mb-6">
              Simplify your event planning with real-time RSVP tracking, beautiful shareable links, and analytics.
            </p>

            <div ref={ctaRef} className="flex justify-center gap-4">
              <Link href="/login">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/event">
                <Button size="lg" variant="outline">
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="py-20 px-6 bg-background z-10 relative">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Why use EventEase?</h2>
            <p className="text-muted-foreground mb-12">Built to streamline your event workflow.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
              <FeatureCard
                icon={<Users2 className="w-6 h-6 text-primary" />}
                title="Easy RSVP Collection"
                description="Share links that collect responses instantly. No signup required for guests."
              />
              <FeatureCard
                icon={<BarChart3 className="w-6 h-6 text-primary" />}
                title="Analytics Built In"
                description="Track attendee stats, response trends, and no-shows with built-in dashboards."
              />
              <FeatureCard
                icon={<Sparkles className="w-6 h-6 text-primary" />}
                title="Customizable Fields"
                description="Add custom questions, notes, or options to fit your unique event needs."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

// Reusable feature card
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-zinc-900 transition hover:shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
