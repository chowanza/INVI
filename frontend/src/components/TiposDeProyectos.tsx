"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const investmentTypes = [
    {
        id: "plusvalia",
        title: "Plusvalía/equity",
        subtitle: "Alta rentabilidad, plazos más largos",
        description: "Los inversores entran en sociedad con el promotor y comparten, según su aportación, la rentabilidad al final del proyecto, con plazos entre los 12 y los 36 meses.",
        image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
        borderColor: "border-orange-500",
    },
    {
        id: "prestamo",
        title: "Préstamo",
        subtitle: "Retorno atractivo con menor riesgo",
        description: "Los inversores financian al promotor a través de un préstamo con garantía hipotecaria sobre el activo, con plazos entre los 6 y los 18 meses.",
        image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        borderColor: "border-blue-500",
    },
    {
        id: "rentas",
        title: "Rentas",
        subtitle: "Proyectos a 3 o más años para perfiles conservadores",
        description: "Se invierte en activos inmobiliarios para ponerlos en alquiler durante varios años y, después, en venta. Brinda rentabilidades periódicas dirigidas a perfiles más conservadores.",
        image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        borderColor: "border-purple-500",
    }
]

export function TiposDeProyectos() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? investmentTypes.length - 1 : prevIndex - 1
        )
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === investmentTypes.length - 1 ? 0 : prevIndex + 1
        )
    }

    return (
        <section className="w-full py-24 bg-[#323642] text-white overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <div className="mb-16 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Tipos de proyectos</h2>
                    <p className="text-xl md:text-2xl text-slate-300 font-medium">
                        Elige la estrategia de inversión que mejor se adapte a tus necesidades
                    </p>
                </div>

                <div className="relative flex items-center justify-center min-h-[400px]">

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-0 md:-left-12 z-20 p-2 text-white hover:text-primary transition-colors bg-black/20 md:bg-transparent rounded-full backdrop-blur-sm md:backdrop-blur-none"
                        aria-label="Anterior tipo de proyecto"
                    >
                        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 md:-right-12 z-20 p-2 text-white hover:text-primary transition-colors bg-black/20 md:bg-transparent rounded-full backdrop-blur-sm md:backdrop-blur-none"
                        aria-label="Siguiente tipo de proyecto"
                    >
                        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                    </button>

                    {/* Carousel Content */}
                    <div className="w-full max-w-4xl mx-auto overflow-hidden relative">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {investmentTypes.map((type, index) => (
                                <div key={type.id} className="w-full flex-shrink-0 px-4 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">

                                    {/* Text Content */}
                                    <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                                        <h3 className="text-3xl md:text-4xl font-bold">{type.title}</h3>
                                        <p className="text-lg md:text-xl font-semibold text-primary">
                                            {type.subtitle}
                                        </p>
                                        <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-md mx-auto md:mx-0">
                                            {type.description}
                                        </p>
                                    </div>

                                    {/* Image Content */}
                                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                                        <div className={`relative w-full max-w-md aspect-square md:aspect-[4/3] border-b-4 border-r-4 ${type.borderColor}`}>
                                            <Image
                                                src={type.image_url}
                                                alt={type.title}
                                                fill
                                                className="object-cover relative -top-4 -left-4 shadow-xl"
                                            />
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {investmentTypes.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "bg-primary w-2.5"
                                    : "bg-slate-500/50 hover:bg-slate-400"
                                }`}
                            aria-label={`Ir a diapositiva ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}
