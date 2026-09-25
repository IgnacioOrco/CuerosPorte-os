import { getDb } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PILLARS, getPillarBySlug, matchProductToPillar } from "@/lib/categories"
import { Send, ArrowRight, Sparkles } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function CatalogPage({
    searchParams
}: {
    searchParams: Promise<{ category?: string }>
}) {
    const params = await searchParams
    const selectedCategory = params.category

    const activePillar = getPillarBySlug(selectedCategory)

    // Fetch products
    const productsSnap = await get(ref(getDb(), "products"))
    const productsVal = productsSnap.val() || {}
    let rawProducts = Object.keys(productsVal)
        .map(key => ({
            id: key,
            ...productsVal[key]
        }))
        .filter(p => p.category !== "Cinturones")

    // Fetch variants
    const variantsSnap = await get(ref(getDb(), "product_variants"))
    const variantsVal = variantsSnap.val() || {}
    const rawVariants = Object.keys(variantsVal).map(key => ({
        id: key,
        ...variantsVal[key]
    })) as any[]

    // Associate variants to products
    const allProducts = rawProducts.map(p => ({
        ...p,
        product_variants: rawVariants.filter(v => v.product_id === p.id && v.is_active)
    }))

    // Filter products by active pillar
    const filteredProducts = activePillar
        ? allProducts.filter(p => {
            // Direct pillar slug or code match
            if (p.category === activePillar.slug || p.category === activePillar.name || p.category === activePillar.code) {
                return true
            }
            // Smart mapping of legacy categories to the 4 pillars of meaning
            return matchProductToPillar(p) === activePillar.slug
        })
        : allProducts

    return (
        <div className="min-h-screen bg-[#FBF8F3] py-10 sm:py-16">
            <div className="container px-4 sm:px-8 mx-auto">
                {/* Editorial Breadcrumbs */}
                <Breadcrumb className="mb-8">
                    <BreadcrumbList className="text-xs uppercase tracking-wider text-[#856a43]">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="hover:text-[#251D13] transition-colors">
                                Inicio
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-[#DDC8A6]" />
                        <BreadcrumbItem>
                            {activePillar ? (
                                <BreadcrumbLink href="/catalogo" className="hover:text-[#251D13] transition-colors">
                                    Catálogo
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage className="font-semibold text-[#251D13]">
                                    Galería de Objetos
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {activePillar && (
                            <>
                                <BreadcrumbSeparator className="text-[#DDC8A6]" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-semibold text-[#251D13]">
                                        {activePillar.code} — {activePillar.name}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Section Header: Philosophy & Context */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 pb-8 border-b border-[#DDC8A6]/40">
                    <div className="max-w-2xl space-y-3">
                        <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#856a43] block">
                            {activePillar ? `Pilar ${activePillar.code} · Arquitectura de Significado` : "El valor de lo que perdura"}
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#251D13] leading-tight">
                            {activePillar ? `${activePillar.name} — ${activePillar.tagline}` : "Galería de Objetos"}
                        </h1>
                        <p className="text-sm sm:text-base text-[#251D13]/75 leading-relaxed font-sans max-w-xl">
                            {activePillar
                                ? activePillar.description
                                : "Objetos de cuero diseñados para acompañar la vida y envejecer bien. Cuatro pilares concebidos con oficio, materiales nobles y vocación de permanencia."}
                        </p>
                    </div>

                    {/* B2B Adaptability Disclaimer Banner */}
                    <div className="max-w-md bg-[#F5EFE6]/80 border border-[#DDC8A6]/60 p-5 rounded-2xl flex items-start gap-3.5 shadow-sm">
                        <div className="p-2 bg-[#251D13] text-[#DDC8A6] rounded-xl shrink-0 mt-0.5">
                            <Send className="h-4 w-4" />
                        </div>
                        <div className="text-xs text-[#251D13]/85 leading-relaxed font-sans">
                            <span className="font-bold text-[#856a43] block uppercase tracking-wider text-[10px] mb-1">
                                Propuesta B2B & Proyectos
                            </span>
                            Cada modelo es un punto de partida. Adaptamos dimensiones, cueros, cuños de marca y acabados para proyectos corporativos.
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
                    {/* Sidebar / Pillar Filter */}
                    <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#DDC8A6]/30">
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#856a43]">
                                    Significado
                                </h2>
                                <span className="text-[10px] text-[#251D13]/50 uppercase font-mono">
                                    4 Pilares
                                </span>
                            </div>

                            <div className="flex flex-col gap-2">
                                {/* Option: All Objects */}
                                <Link
                                    href="/catalogo"
                                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col gap-1 ${
                                        !activePillar
                                            ? "bg-[#251D13] text-[#DDC8A6] border-[#251D13] shadow-sm"
                                            : "bg-[#F5EFE6]/40 hover:bg-[#F5EFE6] text-[#251D13] border-[#DDC8A6]/40"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-serif font-bold uppercase tracking-wider">
                                            Todos los objetos
                                        </span>
                                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                                            !activePillar ? "bg-white/10 text-white" : "bg-[#DDC8A6]/30 text-[#856a43]"
                                        }`}>
                                            {allProducts.length}
                                        </span>
                                    </div>
                                    <span className={`text-[11px] leading-tight ${
                                        !activePillar ? "text-[#DDC8A6]/80" : "text-[#251D13]/60"
                                    }`}>
                                        Visión integral de la colección
                                    </span>
                                </Link>

                                {/* The 4 Pillars */}
                                {PILLARS.map((pillar) => {
                                    const isSelected = activePillar?.slug === pillar.slug
                                    return (
                                        <Link
                                            key={pillar.id}
                                            href={`/catalogo?category=${pillar.slug}`}
                                            className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col gap-1 group ${
                                                isSelected
                                                    ? "bg-[#251D13] text-[#DDC8A6] border-[#251D13] shadow-md"
                                                    : "bg-[#F5EFE6]/40 hover:bg-[#F5EFE6] text-[#251D13] border-[#DDC8A6]/40"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] font-mono font-bold tracking-wider ${
                                                        isSelected ? "text-[#DDC8A6]" : "text-[#856a43]"
                                                    }`}>
                                                        {pillar.code}
                                                    </span>
                                                    <span className="text-xs font-serif font-bold uppercase tracking-wider">
                                                        {pillar.name}
                                                    </span>
                                                </div>
                                                <ArrowRight className={`h-3 w-3 transition-transform ${
                                                    isSelected ? "text-[#DDC8A6] translate-x-0.5" : "text-[#856a43]/50 group-hover:translate-x-1"
                                                }`} />
                                            </div>
                                            <span className={`text-[11px] leading-tight line-clamp-1 ${
                                                isSelected ? "text-[#DDC8A6]/80" : "text-[#251D13]/60"
                                            }`}>
                                                {pillar.tagline}
                                            </span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Pillar Narrative Card in Sidebar */}
                        {activePillar && (
                            <div className="p-4 rounded-xl bg-[#F5EFE6]/60 border border-[#DDC8A6]/50 space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#856a43] block">
                                    Filosofía del Pilar
                                </span>
                                <p className="text-xs text-[#251D13]/80 leading-relaxed italic font-serif">
                                    "{activePillar.description}"
                                </p>
                            </div>
                        )}
                    </aside>

                    {/* Products Grid Section */}
                    <div className="flex-1 space-y-8">
                        {/* Special Bespoke Banner if 04-a-medida is active */}
                        {activePillar?.slug === "04-a-medida" && (
                            <div className="p-6 sm:p-8 rounded-2xl bg-[#251D13] text-[#DDC8A6] border border-[#251D13] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                <div className="space-y-2 max-w-xl">
                                    <div className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.25em] text-[#DDC8A6]/70">
                                        <Sparkles className="h-3 w-3 text-[#DDC8A6]" />
                                        Objetos para imaginar
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-white">
                                        Traé una idea. Nosotros la hacemos objeto.
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[#DDC8A6]/80 leading-relaxed font-sans">
                                        Desarrollamos objetos para marcas, empresas y proyectos que buscan algo más que un producto. Una idea. Un objeto. Hecho para durar.
                                    </p>
                                </div>
                                <Button
                                    asChild
                                    size="sm"
                                    className="rounded-full bg-[#856a43] text-white hover:bg-[#856a43]/90 font-bold uppercase tracking-wider text-xs px-6 py-5 border-none shadow-md shrink-0 cursor-pointer"
                                >
                                    <Link href="/#contacto">
                                        Iniciar Proyecto
                                    </Link>
                                </Button>
                            </div>
                        )}

                        {filteredProducts && filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        variant={product.product_variants?.[0]}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center border border-[#DDC8A6]/40 rounded-2xl bg-[#F5EFE6]/30 p-8 space-y-4">
                                <p className="text-sm font-serif text-[#251D13]/70">
                                    No se encontraron piezas registradas en este pilar actualmente.
                                </p>
                                <Button asChild variant="outline" className="rounded-full border-[#251D13] text-[#251D13]">
                                    <Link href="/catalogo">Ver todos los objetos</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
