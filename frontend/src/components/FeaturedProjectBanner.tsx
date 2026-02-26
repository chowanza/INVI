"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectData } from "./ProjectCard" // Assume we reuse this interface

interface FeaturedProjectBannerProps {
    project?: ProjectData // We can pass a specific project here
}

export function FeaturedProjectBanner({ project }: FeaturedProjectBannerProps) {
    // Mock data if no project is passed
    const featured = project || {
        id: "featured-1",
        title: "Proyecto Residencial Contrueces",
        location: "Chacao, Caracas",
        image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
        target_amount: 2475000,
        current_amount: 0,
        estimated_return: 13.5,
        duration_months: 44,
        status: "COMING_SOON",
        investment_type: "PLUSVALIA",
        opening_date: new Date(Date.now() + 19 * 60 * 60 * 1000 + 37 * 60 * 1000 + 12 * 1000).toISOString() // ~19h 37m from now
    } as ProjectData

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (!featured.opening_date) return

        const targetDate = new Date(featured.opening_date).getTime()

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const difference = targetDate - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                })
            } else {
                clearInterval(interval)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [featured.opening_date])

    return (
        <div className="w-full bg-[#007b7f] text-white overflow-hidden relative border-y-4 border-[#005558]">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[#323642] skew-x-[-20deg] translate-x-32 hidden md:block z-0 shadow-2xl" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between py-8 md:py-12 gap-8">

                    {/* Left Side: Call to Action & Info */}
                    <div className="flex-1 flex flex-col justify-center space-y-4 text-center md:text-left z-10 w-full md:w-auto">
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase drop-shadow-md">
                            Nuevo <br className="hidden md:block" /> Proyecto
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center gap-3 text-lg md:text-2xl font-bold bg-[#005558] w-fit mx-auto md:mx-0 px-6 py-2 rounded-full shadow-inner mb-2 min-h-[52px]">
                            <span className="text-slate-200">Quedan:</span>
                            {isMounted ? (
                                <span className="tracking-wider">
                                    {timeLeft.days > 0 && `${timeLeft.days}Días `}
                                    {timeLeft.hours.toString().padStart(2, '0')}Horas{' '}
                                    {timeLeft.minutes.toString().padStart(2, '0')}Min{' '}
                                    {timeLeft.seconds.toString().padStart(2, '0')}Seg
                                </span>
                            ) : (
                                <span className="tracking-wider opacity-0">00Horas 00Min 00Seg</span> // Placeholder to prevent layout shift
                            )}
                        </div>

                        <div className="pt-2 pb-4">
                            <p className="flex items-center justify-center md:justify-start mb-2 text-slate-100 text-lg">
                                <MapPin className="w-5 h-5 mr-1 text-primary" />
                                {featured.location}
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold">{featured.title}</h3>
                        </div>

                        <div className="pt-4">
                            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 rounded-full shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                                <Link href={`/projects/${featured.id}`}>
                                    VER MÁS
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Side: Project Teaser Card */}
                    <div className="w-full md:w-[450px] flex-shrink-0 z-10">
                        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border-2 border-primary ring-4 ring-slate-900/50 relative group">
                            {/* Image Container */}
                            <div className="relative h-[250px] w-full">
                                <Image
                                    src={featured.image_url}
                                    alt={featured.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-bold shadow-md">
                                        {featured.investment_type === 'PLUSVALIA' ? 'Plusvalía' : 'Préstamo'}
                                    </span>
                                </div>

                                <div className="absolute top-4 right-4 bg-indigo-400 text-indigo-950 px-4 py-2 rounded-xl shadow-lg flex flex-col items-center">
                                    <span className="text-2xl font-black leading-none">{featured.estimated_return}%</span>
                                    <span className="text-[10px] font-semibold uppercase tracking-wide mt-1">TIR Preferente</span>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
