"use client"

import Image from "next/image"
import { LazyMap } from "./lazy-map"
import { Reveal } from "./reveal"
import { motion } from "framer-motion"
import { Sparkles, ShieldCheck, Clock, Compass } from "lucide-react"

export function AboutSection() {
    return (
        <section className="py-24 bg-[#FBF8F3] border-b border-[#DDC8A6]/20 font-sans space-y-28">
            <div className="container px-4 sm:px-8 mx-auto space-y-28">

                {/* Section 1: Brand Manifesto - "EL VALOR DE LO QUE PERDURA" */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#DDC8A6]/30 bg-[#F5EFE6]">
                        <Reveal width="100%" className="h-full">
                            <Image
                                src="/images/products/carpeta con cierre.jpeg"
                                alt="Carpeta de cuero noble en taller artesanal"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                className="object-cover hover:scale-103 transition-transform duration-700 ease-out"
                            />
                        </Reveal>
                    </div>

                    <div className="w-full lg:w-1/2 space-y-6">
                        <Reveal>
                            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#856a43] font-semibold">
                                Filosofía de Marca
                            </span>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#251D13] leading-tight">
                                EL VALOR DE LO QUE PERDURA
                            </h2>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="text-base sm:text-lg text-[#251D13]/85 leading-relaxed font-sans font-normal">
                                Cueros Porteños crea objetos de cuero para durar y perdurar. Combinamos diseño contemporáneo, materiales nobles y oficio para desarrollar objetos que se incorporan a la vida cotidiana y mejoran con el uso. Porque los buenos objetos no se reemplazan. Adquieren historia.
                            </p>
                        </Reveal>

                        {/* Secondary Authority Block: 30 Years of Craft */}
                        <Reveal delay={0.3}>
                            <div className="pt-6 border-t border-[#DDC8A6]/40">
                                <div className="p-5 rounded-2xl bg-[#F5EFE6]/60 border border-[#DDC8A6]/40 flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#856a43]">
                                        <Clock className="w-4 h-4 text-[#856a43]" />
                                        <span>Tres décadas de oficio</span>
                                    </div>
                                    <p className="text-sm text-[#251D13]/80 leading-relaxed font-serif italic">
                                        "30 años trabajando con cuero. Tres décadas de oficio nos enseñaron que la calidad no está en lo que se ve el primer día, sino en lo que permanece después de muchos años de uso."
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Section 2: Workshop & Materiality */}
                <div id="taller" className="scroll-mt-24 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                    <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#DDC8A6]/30 bg-[#F5EFE6]">
                        <Reveal width="100%" className="h-full">
                            <Image
                                src="/images/products/portanotebook.jpeg"
                                alt="Funda porta notebook de cuero natural"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                className="object-cover hover:scale-103 transition-transform duration-700 ease-out"
                            />
                        </Reveal>
                    </div>

                    <div className="w-full lg:w-1/2 space-y-6">
                        <Reveal>
                            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#856a43] font-semibold">
                                El Taller · Buenos Aires
                            </span>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#251D13] leading-tight">
                                Materia prima noble, herramientas y oficio
                            </h2>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="text-base sm:text-lg text-[#251D13]/80 leading-relaxed font-sans font-normal">
                                En nuestro taller seleccionamos personalmente cada corte de cuero vacuno y herrajes macizos. Rechazamos los atajos de la producción efímera: diseñamos objetos con costuras reforzadas y proporciones equilibradas para resistir el paso del tiempo y acompañar la rutina de profesionales, empresas y espacios singulares.
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#DDC8A6]/30">
                                <div>
                                    <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#251D13] block">
                                        Curtido Noble
                                    </span>
                                    <span className="text-xs text-[#251D13]/70 font-sans">
                                        Cuero flor que respira y gana pátina única.
                                    </span>
                                </div>
                                <div>
                                    <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#251D13] block">
                                        Hecho para Durar
                                    </span>
                                    <span className="text-xs text-[#251D13]/70 font-sans">
                                        Herramientas atemporales que mejoran con el uso.
                                    </span>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Section 3: Workshop Location (Where to find us) */}
                <div id="ubicacion" className="space-y-8 scroll-mt-24">
                    <div className="text-center max-w-xl mx-auto space-y-3">
                        <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#856a43]">
                            Presencia en Buenos Aires
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-[#251D13]">
                            Dónde encontrarnos
                        </h2>
                        <p className="text-xs sm:text-sm text-[#251D13]/70 font-sans">
                            Visitas al taller coordinadas previamente para proyectos a medida y desarrollo de prototipos.
                        </p>
                    </div>
                    
                    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-[#DDC8A6]/40 shadow-lg bg-[#F5EFE6]">
                        <LazyMap />
                    </div>
                </div>

            </div>
        </section>
    )
}
