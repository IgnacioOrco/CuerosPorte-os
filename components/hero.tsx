"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Compass, Sparkles, Feather } from "lucide-react"

export function Hero() {
    const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const element = document.getElementById("contacto")
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section className="relative w-full min-h-[85vh] flex items-center bg-[#FBF8F3] py-16 lg:py-24 overflow-hidden border-b border-[#DDC8A6]/30">
            {/* Subtle warm architectural texture */}
            <div className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#856a43_1px,transparent_1px)] [background-size:28px_28px]" />

            <div className="container relative z-10 px-4 sm:px-8 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Editorial Statement */}
                    <div className="lg:col-span-7 space-y-8 flex flex-col justify-center text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2">
                                <span className="w-6 h-px bg-[#856a43]" />
                                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#856a43] font-semibold">
                                    Cueros Porteños · Buenos Aires
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#251D13] leading-[1.08]">
                                HECHO PARA DURAR. <br />
                                <span className="text-[#856a43] font-normal italic">
                                    PENSADO PARA PERDURAR.
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-base sm:text-lg text-[#251D13]/75 leading-relaxed max-w-xl font-sans"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Diseño, cuero y oficio para crear objetos que merecen durar. Piezas concebidas para acompañar el trabajo, habitar los espacios y envejecer bien con el uso cotidiano.
                        </motion.p>

                        {/* Editorial CTAs */}
                        <motion.div
                            className="flex flex-wrap items-center gap-4 pt-2"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Button
                                asChild
                                size="lg"
                                className="rounded-full px-8 py-6 text-xs uppercase tracking-wider font-semibold bg-[#251D13] text-[#DDC8A6] hover:bg-[#34291c] hover:text-white transition-all duration-300 shadow-sm border-none group cursor-pointer"
                            >
                                <a href="#contacto" onClick={handleScrollToContact} className="flex items-center gap-2.5">
                                    <span>Desarrollar un Proyecto</span>
                                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 py-6 text-xs uppercase tracking-wider font-semibold bg-transparent border-[#251D13]/30 text-[#251D13] hover:border-[#251D13] hover:bg-[#251D13]/5 transition-all duration-300"
                            >
                                <Link href="/catalogo">
                                    Explorar Catálogo
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Understated Editorial Authority Line */}
                        <motion.div
                            className="pt-8 border-t border-[#DDC8A6]/40 grid grid-cols-1 sm:grid-cols-3 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.45 }}
                        >
                            <div className="space-y-1">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#251D13] block font-serif">
                                    Materia Noble
                                </span>
                                <p className="text-xs text-[#251D13]/65 leading-relaxed font-sans">
                                    Cueros seleccionados que adquieren historia y una pátina única.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#251D13] block font-serif">
                                    Oficio Marroquinero
                                </span>
                                <p className="text-xs text-[#251D13]/65 leading-relaxed font-sans">
                                    Taller propio en Buenos Aires con costuras y herrajes macizos.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#251D13] block font-serif">
                                    Objetos con Sentido
                                </span>
                                <p className="text-xs text-[#251D13]/65 leading-relaxed font-sans">
                                    Herramientas y piezas atemporales que trascienden modas.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual Composition with Material Focus */}
                    <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex items-center justify-center">
                        <motion.div 
                            className="relative w-full h-full max-w-[420px] lg:max-w-none"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Main leather object image */}
                            <div className="absolute top-0 right-0 w-[84%] h-[80%] rounded-2xl overflow-hidden shadow-2xl border border-[#DDC8A6]/30 z-10 group bg-[#F5EFE6]">
                                <Image
                                    src="/images/products/portafolio 3 fuelles.jpeg"
                                    alt="Portafolio de cuero de grano noble Cueros Porteños"
                                    fill
                                    sizes="(max-width: 1024px) 85vw, 420px"
                                    className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                                    priority
                                />
                            </div>

                            {/* Secondary overlapping detail image */}
                            <div className="absolute bottom-0 left-0 w-[54%] h-[50%] rounded-2xl overflow-hidden shadow-xl border-4 border-[#FBF8F3] z-20 group bg-[#F5EFE6]">
                                <Image
                                    src="/images/products/carpeta con cierre(1).jpeg"
                                    alt="Detalle de confección y cierre artesanal"
                                    fill
                                    sizes="(max-width: 1024px) 50vw, 240px"
                                    className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Minimalist Floating Seal */}
                            <motion.div 
                                className="absolute -bottom-3 right-6 bg-[#251D13] text-[#DDC8A6] px-5 py-3 shadow-xl z-30 flex flex-col items-center justify-center rounded-xl border border-[#DDC8A6]/40"
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase text-[#DDC8A6]/80 leading-none">
                                    Buenos Aires
                                </span>
                                <span className="text-xs font-serif font-semibold mt-1 text-white">
                                    El valor de lo que perdura
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}
