import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Product, ProductVariant } from "@/types/database"
import { matchProductToPillar, getPillarBySlug } from "@/lib/categories"

interface ProductCardProps {
    product: Product
    variant?: ProductVariant
}

const DURABILITY_TAGS = [
    "Envejece bien con el uso",
    "Material que adquiere historia",
    "Diseñado para la vida cotidiana"
]

export function getProductVariantImages(variant?: any): string[] {
    if (!variant) return []

    const list: string[] = []

    if (variant.images) {
        if (Array.isArray(variant.images)) {
            list.push(...variant.images)
        } else if (typeof variant.images === "string") {
            list.push(variant.images)
        }
    }

    if (variant.image && typeof variant.image === "string") {
        list.push(variant.image)
    }

    return list
        .map(img => {
            const trimmed = img.trim()
            if (!trimmed) return ""
            if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
                return trimmed
            }
            return `/images/products/${trimmed}`
        })
        .filter(img => img.length > 0)
}

export function ProductCard({ product, variant }: ProductCardProps) {
    const images = getProductVariantImages(variant)

    // Select a deterministic durability badge based on product name/id
    const charCodeSum = (product.id || product.name || "cp")
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const durabilityTag = DURABILITY_TAGS[charCodeSum % DURABILITY_TAGS.length]

    // Identify pillar for category badge
    const pillarSlug = matchProductToPillar(product)
    const pillar = getPillarBySlug(pillarSlug)

    return (
        <Link href={`/producto/${product.slug}`} className="group block focus:outline-none">
            <Card className="h-full border-0 shadow-none bg-transparent overflow-hidden">
                {/* Generous Material-Focused Image Frame */}
                <CardContent className="p-0 relative aspect-[4/5] bg-[#F5EFE6] rounded-2xl overflow-hidden mb-4 border border-[#DDC8A6]/30">
                    {images[0] ? (
                        <>
                            {/* Primary image */}
                            <Image
                                src={images[0]}
                                alt={product.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                                className={`object-cover transition-all duration-700 ease-out ${
                                    images[1] 
                                        ? "group-hover:opacity-0 scale-100 group-hover:scale-103" 
                                        : "group-hover:scale-103"
                                }`}
                            />
                            {/* Secondary hover image */}
                            {images[1] && (
                                <Image
                                    src={images[1]}
                                    alt={`${product.name} - Detalle de materialidad`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 scale-103 group-hover:scale-100 transition-all duration-700 ease-out"
                                />
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#251D13]/40 bg-[#F5EFE6] font-mono text-xs">
                            Sin Imagen
                        </div>
                    )}

                    {/* Pillar Badge */}
                    <div className="absolute top-3.5 left-3.5">
                        <Badge variant="secondary" className="bg-[#FBF8F3]/90 backdrop-blur-md text-[9px] font-mono font-bold uppercase tracking-[0.15em] rounded-md text-[#251D13] border border-[#DDC8A6]/50 shadow-xs px-2.5 py-1">
                            {pillar ? `${pillar.code} ${pillar.name}` : product.category}
                        </Badge>
                    </div>

                    {/* Micro-text Badge: Durability */}
                    <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-[#251D13]/85 backdrop-blur-md text-[#DDC8A6] px-3 py-1.5 rounded-lg border border-[#DDC8A6]/20 text-[10px] font-sans font-medium flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="truncate">{durabilityTag}</span>
                            <ArrowRight className="h-3 w-3 shrink-0 ml-1.5 text-[#DDC8A6]" />
                        </div>
                    </div>
                </CardContent>

                {/* Editorial Typography & Material Description */}
                <CardFooter className="p-0 flex flex-col items-start gap-1">
                    {/* Micro-text reinforcing durability */}
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#856a43]">
                        <span className="w-1 h-1 rounded-full bg-[#856a43]" />
                        <span>{durabilityTag}</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg leading-snug text-[#251D13] group-hover:text-[#856a43] transition-colors">
                        {product.name}
                    </h3>

                    <p className="text-xs text-[#251D13]/65 font-sans">
                        {product.material || "Cuero vacuno genuino"} · Hecho para durar
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#251D13] mt-2 group-hover:text-[#856a43] transition-colors">
                        <span>Ver objeto</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                </CardFooter>
            </Card>
        </Link>
    )
}
