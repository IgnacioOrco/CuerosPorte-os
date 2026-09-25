"use client"

import { Reveal } from "./reveal"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

// Custom SVG Icons for craft and branding techniques
function SerigrafiaIcon() {
    return (
        <svg className="w-7 h-7 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="1.5" strokeWidth="1.5" className="opacity-90" />
            <path d="M3 8h18M3 16h18M8 3v18M16 3v18" strokeWidth="1" strokeDasharray="1 3" className="opacity-30" />
            <path d="M5 6h14v2.5H5z" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
            <path d="M12 8.5v3.5M9 12h6" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 16.5c3-1.5 5-1.5 8 0s4 1.5 6 0" strokeWidth="2.5" strokeLinecap="round" className="text-[#856a43]/80" />
        </svg>
    )
}

function LaserIcon() {
    return (
        <svg className="w-7 h-7 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 3v6" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 5h6" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 9l2 3.5 2-3.5" strokeWidth="1" strokeLinejoin="round" className="opacity-50" />
            <path d="M12 11.5v4" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 1" />
            <circle cx="12" cy="18.5" r="1" fill="currentColor" />
            <path d="M7 18.5h3M14 18.5h3" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 16v1M10 17l.5.5M14 17l-.5.5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

function BajoRelieveIcon() {
    return (
        <svg className="w-7 h-7 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 4h16v2.5H4z" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
            <path d="M8 6.5v3M16 6.5v3" strokeWidth="1.5" />
            <path d="M7 9.5h10l-1.5 4h-7l-1.5-4z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" />
            <path d="M3 20h3.5v-2h11v2H21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5.5v3m0 0l-1-1m1 1l1-1" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    )
}

function AltaFrecuenciaIcon() {
    return (
        <svg className="w-7 h-7 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 5h14v2H5z" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
            <path d="M4 12c1.5-3 2.5-3 4 0s2.5 3 4 0 2.5-3 4 0 2.5 3 4 0" strokeWidth="1.5" strokeLinecap="round" className="text-[#856a43]/80" />
            <path d="M3 18h18" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 15v1M12 15v1M16 15v1" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

const techniques = [
    {
        icon: BajoRelieveIcon,
        title: "Bajo Relieve",
        subtitle: "Cuño a presión tradicional",
        description: "La técnica madre del taller de marroquinería. Con calor y presión milimétrica, la marca se hunde físicamente en el cuero sin perder nitidez. Se puede aplicar en seco o con sutil foil metálico.",
        materials: "Cuero vacuno curtido noble",
        features: ["Textura física tridimensional", "Elegancia discreta e indeleble", "Acabado en seco o hot-stamping"]
    },
    {
        icon: LaserIcon,
        title: "Grabado Láser",
        subtitle: "Contraste y exactitud digital",
        description: "Tecnología de haz de luz que quema superficialmente el material con exactitud milimétrica. Ideal para trazos finos, tipografías condensadas o tramas geométricas complejas.",
        materials: "Cuero y complementos",
        features: ["Definición en tipografía pequeña", "Marcado permanente e inalterable", "Ideal para tiradas dinámicas"]
    },
    {
        icon: SerigrafiaIcon,
        title: "Serigrafía",
        subtitle: "Normas de color y fidelidad",
        description: "Recomendada para aplicaciones que exigen exactitud en colores corporativos (Pantone) sobre tela o cuero. Aporta un acabado plano de alta opacidad con tintas resistentes.",
        materials: "Telas nobles o cuero",
        features: ["Fidelidad cromática Pantone", "Acabado liso de gran cobertura", "Resistencia al desgaste por fricción"]
    },
    {
        icon: AltaFrecuenciaIcon,
        title: "Alta Frecuencia",
        subtitle: "Relieve termosellado",
        description: "Ondas electromagnéticas combinadas con presión que moldean la materia de forma permanente, otorgándole relieve y volumen tridimensional uniforme.",
        materials: "Telas vinílicas y cueros",
        features: ["Termosellado de precisión", "Volumen táctil duradero", "Máxima resistencia al uso intensivo"]
    }
]

export function CustomizationSection() {
    const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const element = document.getElementById("contacto")
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section id="personalizacion" className="py-24 bg-[#FBF8F3] border-b border-[#DDC8A6]/20 scroll-mt-24 font-sans">
            <div className="container px-4 sm:px-8 mx-auto">
                
                {/* Header Section: "Objetos para imaginar" */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
                    <Reveal width="100%">
                        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#856a43] font-semibold">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Desarrollo B2B · Proyectos a Medida</span>
                        </div>
                    </Reveal>

                    <Reveal width="100%" delay={0.1}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#251D13] leading-tight">
                            Objetos para imaginar
                        </h2>
                    </Reveal>

                    <Reveal width="100%" delay={0.15}>
                        <div className="py-2">
                            <p className="text-xl sm:text-2xl font-serif italic text-[#856a43] font-normal">
                                "Traé una idea. Nosotros la hacemos objeto."
                            </p>
                        </div>
                    </Reveal>

                    <Reveal width="100%" delay={0.2}>
                        <p className="text-sm sm:text-base text-[#251D13]/75 leading-relaxed font-sans max-w-2xl mx-auto">
                            Trabajamos junto a marcas, empresas, hoteles y restaurantes para transformar ideas en objetos. Una idea. Un objeto. Hecho para durar.
                        </p>
                    </Reveal>
                </div>

                {/* 4-Card Grid: Craft Techniques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto mb-16">
                    {techniques.map((tech, idx) => {
                        const IconComponent = tech.icon
                        return (
                            <Reveal key={idx} width="100%" delay={0.1 * (idx + 1)} className="h-full">
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative flex flex-col justify-between p-6 bg-[#F5EFE6]/50 border border-[#DDC8A6]/40 rounded-2xl hover:border-[#856a43] hover:shadow-lg transition-all duration-300 group h-full"
                                >
                                    <div>
                                        {/* Icon Header */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-[#FBF8F3] border border-[#DDC8A6]/40 rounded-xl text-[#856a43] group-hover:bg-[#251D13] group-hover:text-[#DDC8A6] transition-all duration-300 shadow-sm">
                                                <IconComponent />
                                            </div>
                                            <span className="text-[10px] font-mono font-bold tracking-wider text-[#856a43]/70 uppercase bg-[#FBF8F3] border border-[#DDC8A6]/30 px-2.5 py-1 rounded-full">
                                                Técnica 0{idx + 1}
                                            </span>
                                        </div>

                                        {/* Titles */}
                                        <h3 className="text-lg font-serif font-bold text-[#251D13] mb-1 group-hover:text-[#856a43] transition-colors">
                                            {tech.title}
                                        </h3>
                                        <p className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#856a43] mb-3">
                                            {tech.subtitle}
                                        </p>

                                        {/* Description */}
                                        <p className="text-xs text-[#251D13]/70 leading-relaxed font-sans font-normal mb-6">
                                            {tech.description}
                                        </p>
                                    </div>

                                    {/* Footer details */}
                                    <div className="border-t border-[#DDC8A6]/30 pt-4 space-y-2.5">
                                        <div className="text-[11px] text-[#251D13]/70">
                                            <span className="font-bold uppercase tracking-wider block mb-0.5 text-[9px] text-[#856a43]">Material sugerido:</span>
                                            <span className="font-medium text-[#251D13]">{tech.materials}</span>
                                        </div>

                                        <ul className="space-y-1 pt-1">
                                            {tech.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-center gap-1.5 text-[11px] text-[#251D13]/80 font-sans">
                                                    <span className="w-1 h-1 rounded-full bg-[#856a43] shrink-0" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </Reveal>
                        )
                    })}
                </div>

                {/* Bottom Call to Action for B2B Projects */}
                <div className="text-center pt-4">
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full px-8 py-6 text-xs uppercase tracking-wider font-semibold bg-[#251D13] text-[#DDC8A6] hover:bg-[#34291c] hover:text-white transition-all duration-300 shadow-sm border-none group cursor-pointer"
                    >
                        <a href="#contacto" onClick={handleScrollToContact} className="inline-flex items-center gap-2.5">
                            <span>Conversar sobre un desarrollo a medida</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </div>

            </div>
        </section>
    )
}
