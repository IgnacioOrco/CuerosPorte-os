"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Product, ProductVariant } from "@/types/database"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { MessageCircle, ChevronLeft, ChevronRight, Send, X, Check, Loader2, UploadCloud, File, Sparkles, Shield, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getProductVariantImages } from "@/components/product-card"
import { matchProductToPillar, getPillarBySlug } from "@/lib/categories"
import { toast } from "sonner"

interface ProductDetailProps {
    product: Product
    variants: ProductVariant[]
}

export function ProductDetail({ product, variants }: ProductDetailProps) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
        variants.find(v => v.is_active) || variants[0]
    )
    const [activeIdx, setActiveIdx] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Modal Form States
    const [modalName, setModalName] = useState("")
    const [modalCompany, setModalCompany] = useState("")
    const [modalEmail, setModalEmail] = useState("")
    const [modalPhone, setModalPhone] = useState("")
    const [modalQuantity, setModalQuantity] = useState("100")
    const [modalMessage, setModalMessage] = useState(
        `Hola, me interesa solicitar una cotización para un desarrollo corporativo inspirado en el objeto "${product.name}"${selectedVariant ? ` (Color: ${selectedVariant.color_name})` : ""}.`
    )
    const [modalFiles, setModalFiles] = useState<File[]>([])
    const [modalDragOver, setModalDragOver] = useState(false)
    const [modalSubmitting, setModalSubmitting] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const images = getProductVariantImages(selectedVariant)
    const currentImages = images.length
        ? images
        : ["/images/products/portafolio 3 fuelles.jpeg"]

    const handlePrev = () => {
        setActiveIdx((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIdx((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1))
    }

    const whatsappMessage = encodeURIComponent(
        `Hola Cueros Porteños. Me interesa realizar una consulta para un desarrollo a medida inspirado en: ${product.name} (Color: ${selectedVariant?.color_name || 'Estándar'}).`
    )
    const whatsappLink = `https://wa.me/541140240594?text=${whatsappMessage}`

    // Pillar context
    const pillarSlug = matchProductToPillar(product)
    const pillar = getPillarBySlug(pillarSlug)

    // Modal Handlers
    const handleOpenModal = () => {
        setModalMessage(
            `Hola, me interesa solicitar una cotización para un desarrollo corporativo inspirado en el objeto "${product.name}"${selectedVariant ? ` (Color: ${selectedVariant.color_name})` : ""}.`
        )
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setModalSuccess(false)
    }

    const handleModalSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!modalName || !modalCompany || !modalEmail || !modalPhone || !modalQuantity || !modalMessage) {
            toast.error("Por favor completa los campos requeridos.")
            return
        }

        setModalSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 1400))
        setModalSubmitting(false)
        setModalSuccess(true)
        toast.success(`¡Consulta enviada para el objeto ${product.name}!`)

        // Reset
        setModalName("")
        setModalCompany("")
        setModalEmail("")
        setModalPhone("")
        setModalFiles([])
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setModalDragOver(true)
    }

    const handleDragLeave = () => {
        setModalDragOver(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setModalDragOver(false)
        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files)
            setModalFiles(prev => [...prev, ...newFiles])
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setModalFiles(prev => [...prev, ...newFiles])
        }
    }

    const removeFile = (index: number) => {
        setModalFiles(prev => prev.filter((_, idx) => idx !== index))
    }

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Left: Generous Material-Focused Gallery */}
                <div className="lg:col-span-6 space-y-4">
                    <div className="relative aspect-[4/5] bg-[#F5EFE6] border border-[#DDC8A6]/40 rounded-2xl overflow-hidden group shadow-sm">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={currentImages[activeIdx]}
                                    alt={`Detalle y materialidad de ${product.name}`}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 650px"
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Controls */}
                        {currentImages.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FBF8F3]/90 backdrop-blur-md border border-[#DDC8A6]/40 flex items-center justify-center shadow-md hover:bg-[#FBF8F3] transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 z-10 cursor-pointer text-[#251D13]"
                                    aria-label="Anterior imagen"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FBF8F3]/90 backdrop-blur-md border border-[#DDC8A6]/40 flex items-center justify-center shadow-md hover:bg-[#FBF8F3] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 z-10 cursor-pointer text-[#251D13]"
                                    aria-label="Siguiente imagen"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        {/* Dots */}
                        {currentImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-[#FBF8F3]/80 backdrop-blur-md px-3 py-1.5 rounded-full z-10 border border-[#DDC8A6]/40">
                                {currentImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIdx(idx)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                                            activeIdx === idx 
                                                ? "bg-[#251D13] w-4" 
                                                : "bg-[#251D13]/30 hover:bg-[#251D13]/60"
                                        )}
                                        aria-label={`Ir a detalle ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Thumbnails row */}
                    {currentImages.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                            {currentImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIdx(idx)}
                                    className={cn(
                                        "relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 bg-[#F5EFE6]",
                                        activeIdx === idx
                                            ? "border-[#856a43] shadow-sm opacity-100 scale-[1.02]"
                                            : "border-[#DDC8A6]/50 opacity-60 hover:opacity-100"
                                    )}
                                >
                                    <Image
                                        src={img}
                                        alt={`Miniatura ${idx + 1}`}
                                        fill
                                        sizes="80px"
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Object Narrative, Philosophy & Inquiries */}
                <div className="lg:col-span-6 flex flex-col justify-center space-y-6 font-sans">
                    
                    {/* Header Badges */}
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                            {pillar && (
                                <Badge variant="outline" className="text-[10px] font-mono font-bold uppercase tracking-wider rounded-md text-[#856a43] border-[#DDC8A6]/80 bg-[#F5EFE6]/60 px-2.5 py-1">
                                    {pillar.code} — {pillar.name}
                                </Badge>
                            )}
                            <Badge variant="secondary" className="text-[10px] font-mono uppercase tracking-wider rounded-md text-[#251D13] bg-[#F5EFE6] border border-[#DDC8A6]/40 px-2.5 py-1">
                                Diseñado para la vida cotidiana
                            </Badge>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#251D13] leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-base text-[#251D13]/75 leading-relaxed font-sans pt-1">
                            {product.description || "Objeto marroquinero de manufactura noble, pensado para acompañar el día a día y desarrollar una pátina singular con el uso sostenido."}
                        </p>
                    </div>

                    {/* Durability Philosophy Card */}
                    <div className="p-5 rounded-2xl bg-[#F5EFE6]/70 border border-[#DDC8A6]/50 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#856a43]">
                            <Sparkles className="w-3.5 h-3.5 text-[#856a43]" />
                            <span>El valor de lo que perdura</span>
                        </div>
                        <p className="text-xs text-[#251D13]/85 leading-relaxed font-serif italic">
                            "Los buenos objetos no se reemplazan. Adquieren historia. Esta pieza fue concebida para resistir el paso del tiempo y enriquecerse con el roce y la rutina."
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#DDC8A6]/30 text-[11px] text-[#251D13]/80">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#856a43] shrink-0" />
                                <span>Envejece bien con el uso</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#856a43] shrink-0" />
                                <span>Material que adquiere historia</span>
                            </div>
                        </div>
                    </div>

                    {/* Material & Technical Specifications */}
                    <div className="space-y-4 pt-4 border-t border-[#DDC8A6]/40">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="block text-[#856a43] font-mono uppercase tracking-wider text-[10px] font-bold mb-0.5">
                                    Material Base
                                </span>
                                <span className="font-serif font-bold text-sm text-[#251D13]">
                                    {product.material || "Cuero Vacuno Flor"}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[#856a43] font-mono uppercase tracking-wider text-[10px] font-bold mb-0.5">
                                    Dimensiones Base
                                </span>
                                <span className="font-serif font-bold text-sm text-[#251D13]">
                                    {product.dimensions || "Adaptables a medida"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* B2B Adaptability Notice */}
                    <div className="p-4 rounded-xl border border-dashed border-[#856a43]/40 bg-[#FBF8F3] space-y-1 text-xs text-[#251D13]/80">
                        <span className="font-bold text-[#856a43] uppercase tracking-wider text-[10px] block">
                            Punto de Partida para Proyectos
                        </span>
                        <span>
                            Personalizamos este modelo en cueros, colores corporativos, herrajes y grabado de logo (bajo relieve, láser o serigrafía) para marcas y empresas.
                        </span>
                    </div>

                    {/* Conversion Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button 
                            onClick={handleOpenModal}
                            size="lg" 
                            className="flex-1 rounded-full bg-[#251D13] text-[#DDC8A6] hover:bg-[#34291c] hover:text-white font-semibold uppercase tracking-wider text-xs py-6 cursor-pointer transition-all shadow-sm border-none"
                        >
                            Consultar por este desarrollo
                        </Button>
                        <Button 
                            asChild
                            variant="outline"
                            size="lg" 
                            className="rounded-full border-[#251D13]/40 text-[#251D13] hover:border-[#251D13] hover:bg-[#251D13]/5 font-semibold uppercase tracking-wider text-xs py-6 cursor-pointer flex items-center justify-center gap-2"
                        >
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="w-4 h-4 text-[#856a43]" />
                                Consultar por WhatsApp
                            </a>
                        </Button>
                    </div>

                </div>
            </div>

            {/* B2B Consultation Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-[#251D13]/40 backdrop-blur-md cursor-pointer"
                        />

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.96, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 8 }}
                            className="relative w-full max-w-xl bg-[#FBF8F3] border border-[#DDC8A6]/50 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] z-10"
                        >
                            <button 
                                onClick={handleCloseModal}
                                className="absolute right-4 top-4 text-[#856a43] hover:text-[#251D13] p-1 transition-colors cursor-pointer"
                                aria-label="Cerrar ventana"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="mb-6 space-y-1">
                                <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#856a43]">
                                    Desarrollo B2B · Consulta
                                </span>
                                <h2 className="text-xl font-serif font-bold text-[#251D13]">
                                    Proyecto Inspirado en: <span className="text-[#856a43]">{product.name}</span>
                                </h2>
                                <p className="text-xs text-[#251D13]/70 leading-relaxed font-sans">
                                    Contanos sobre tu empresa, requerimientos de cantidad o adaptaciones deseadas. Te responderemos con una propuesta personalizada.
                                </p>
                            </div>

                            <AnimatePresence mode="wait">
                                {!modalSuccess ? (
                                    <motion.form 
                                        key="modalForm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleModalSubmit}
                                        className="space-y-4 font-sans"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="modalName" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Nombre de Contacto *</Label>
                                                <Input 
                                                    id="modalName"
                                                    type="text"
                                                    required
                                                    placeholder="Ej. Juan Pérez"
                                                    value={modalName}
                                                    onChange={e => setModalName(e.target.value)}
                                                    className="rounded-lg border-[#DDC8A6] focus:border-[#856a43] text-xs bg-white/70"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="modalCompany" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Empresa *</Label>
                                                <Input 
                                                    id="modalCompany"
                                                    type="text"
                                                    required
                                                    placeholder="Ej. Estudio o Marca"
                                                    value={modalCompany}
                                                    onChange={e => setModalCompany(e.target.value)}
                                                    className="rounded-lg border-[#DDC8A6] focus:border-[#856a43] text-xs bg-white/70"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="modalEmail" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Email Corporativo *</Label>
                                                <Input 
                                                    id="modalEmail"
                                                    type="email"
                                                    required
                                                    placeholder="ejemplo@empresa.com"
                                                    value={modalEmail}
                                                    onChange={e => setModalEmail(e.target.value)}
                                                    className="rounded-lg border-[#DDC8A6] focus:border-[#856a43] text-xs bg-white/70"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="modalPhone" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Teléfono *</Label>
                                                <Input 
                                                    id="modalPhone"
                                                    type="tel"
                                                    required
                                                    placeholder="Ej. +54 11 1234 5678"
                                                    value={modalPhone}
                                                    onChange={e => setModalPhone(e.target.value)}
                                                    className="rounded-lg border-[#DDC8A6] focus:border-[#856a43] text-xs bg-white/70"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <Label htmlFor="modalQuantity" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Cantidad Estimada *</Label>
                                            <Input 
                                                id="modalQuantity"
                                                type="number"
                                                required
                                                min="1"
                                                placeholder="Ej. 100"
                                                value={modalQuantity}
                                                onChange={e => setModalQuantity(e.target.value)}
                                                className="rounded-lg border-[#DDC8A6] focus:border-[#856a43] text-xs bg-white/70"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label htmlFor="modalMessage" className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Especificaciones o Idea</Label>
                                            <Textarea 
                                                id="modalMessage"
                                                rows={3}
                                                required
                                                placeholder="Contanos sobre colores deseados, medidas o técnica de cuño de logo..."
                                                value={modalMessage}
                                                onChange={e => setModalMessage(e.target.value)}
                                                className="rounded-lg border-[#DDC8A6] focus:border-[#856a43] text-xs resize-none bg-white/70"
                                            />
                                        </div>

                                        {/* File Upload Drag & Drop */}
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-bold uppercase tracking-wider text-[#251D13]/80">Manual de Marca o Logo (Opcional)</Label>
                                            <div 
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                                onClick={() => fileInputRef.current?.click()}
                                                className={cn(
                                                    "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center space-y-1 bg-[#F5EFE6]/40",
                                                    modalDragOver ? "border-[#251D13] bg-[#DDC8A6]/20" : "border-[#DDC8A6] hover:border-[#856a43]"
                                                )}
                                            >
                                                <input 
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileSelect}
                                                    multiple
                                                    className="hidden"
                                                    accept=".pdf,.png,.jpg,.jpeg,.svg,.ai,.eps,.zip"
                                                />
                                                <UploadCloud className="h-5 w-5 text-[#856a43]" />
                                                <p className="text-[11px] font-bold text-[#251D13]">Arrastrá tus archivos o hacé clic para subir</p>
                                            </div>

                                            {modalFiles.length > 0 && (
                                                <div className="pt-2 space-y-1 max-h-24 overflow-y-auto pr-1">
                                                    {modalFiles.map((file, idx) => (
                                                        <div key={idx} className="flex items-center justify-between p-1.5 bg-[#F5EFE6] border border-[#DDC8A6]/30 rounded-lg text-[10px]">
                                                            <div className="flex items-center gap-1.5 truncate max-w-[85%] text-[#251D13]">
                                                                <File className="h-3 w-3 shrink-0 text-[#856a43]" />
                                                                <span className="truncate font-semibold">{file.name}</span>
                                                                <span className="text-[9px] text-[#251D13]/60 shrink-0">({formatBytes(file.size)})</span>
                                                            </div>
                                                            <button 
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    removeFile(idx)
                                                                }}
                                                                className="text-[#856a43] hover:text-[#251D13] p-0.5 cursor-pointer"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <Button 
                                            type="submit"
                                            disabled={modalSubmitting}
                                            className="w-full rounded-full bg-[#251D13] text-[#DDC8A6] hover:bg-[#34291c] hover:text-white text-xs font-semibold uppercase tracking-wider py-5 cursor-pointer flex items-center justify-center gap-2 border-none"
                                        >
                                            {modalSubmitting ? (
                                                <>
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                    Enviando Consulta...
                                                </>
                                            ) : (
                                                "Enviar Solicitud de Desarrollo"
                                            )}
                                        </Button>
                                    </motion.form>
                                ) : (
                                    <motion.div 
                                        key="modalSuccess"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="py-10 text-center flex flex-col items-center justify-center space-y-4"
                                    >
                                        <div className="h-14 w-14 rounded-full bg-[#F5EFE6] text-[#856a43] border border-[#DDC8A6]/40 flex items-center justify-center">
                                            <Check className="h-7 w-7" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold font-serif text-lg text-[#251D13]">¡Solicitud Recibida!</h3>
                                            <p className="text-xs text-[#251D13]/70 max-w-sm leading-relaxed font-sans">
                                                Analizaremos tu consulta para el desarrollo basado en "{product.name}". Te contactaremos a la brevedad con alternativas y plazos de taller.
                                            </p>
                                        </div>
                                        <Button 
                                            onClick={handleCloseModal}
                                            className="rounded-full px-6 py-4 cursor-pointer mt-4 bg-[#251D13] text-[#DDC8A6]"
                                        >
                                            Cerrar
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
