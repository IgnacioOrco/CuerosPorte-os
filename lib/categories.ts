import { getDb } from "./firebase"
import { ref, get } from "firebase/database"

export interface Category {
    id: string
    code: string
    name: string
    slug: string
    tagline: string
    description: string
}

export const PILLARS: Category[] = [
    {
        id: "01-trabajo",
        code: "01",
        name: "TRABAJO",
        slug: "01-trabajo",
        tagline: "Objetos para trabajar",
        description: "Herramientas y accesorios pensados para acompañar el trabajo cotidiano durante años."
    },
    {
        id: "02-casa",
        code: "02",
        name: "CASA",
        slug: "02-casa",
        tagline: "Objetos para habitar",
        description: "Objetos que se incorporan a la vida cotidiana y mejoran con el uso."
    },
    {
        id: "03-regalo",
        code: "03",
        name: "REGALO",
        slug: "03-regalo",
        tagline: "Objetos para permanecer",
        description: "Regalos que no se consumen en un momento: se incorporan a una historia."
    },
    {
        id: "04-a-medida",
        code: "04",
        name: "A MEDIDA",
        slug: "04-a-medida",
        tagline: "Objetos para imaginar",
        description: "Desarrollamos objetos para marcas, empresas y proyectos que buscan algo más que un producto."
    }
]

/**
 * Returns the pillar matching the provided slug, code or identifier.
 */
export function getPillarBySlug(slugOrId?: string | null): Category | undefined {
    if (!slugOrId) return undefined
    const clean = slugOrId.toLowerCase().trim()
    return PILLARS.find(p => 
        p.slug.toLowerCase() === clean || 
        p.id.toLowerCase() === clean || 
        p.name.toLowerCase() === clean ||
        p.code === clean
    )
}

/**
 * Maps a product category (or legacy taxonomy) to one of the 4 core pillars of meaning.
 */
export function matchProductToPillar(product: { category?: string | null; name?: string | null }): string {
    const rawCategory = (product.category || "").toLowerCase().trim()
    const rawName = (product.name || "").toLowerCase().trim()
    const combined = `${rawCategory} ${rawName}`

    if (
        combined.includes("01-trabajo") ||
        combined.includes("trabajo") ||
        combined.includes("portafolio") ||
        combined.includes("carpeta") ||
        combined.includes("notebook") ||
        combined.includes("oficina")
    ) {
        return "01-trabajo"
    }

    if (
        combined.includes("02-casa") ||
        combined.includes("casa") ||
        combined.includes("habitar") ||
        combined.includes("bolso") ||
        combined.includes("tote") ||
        combined.includes("neceser") ||
        combined.includes("viaje")
    ) {
        return "02-casa"
    }

    if (
        combined.includes("03-regalo") ||
        combined.includes("regalo") ||
        combined.includes("permanecer") ||
        combined.includes("billetera") ||
        combined.includes("tarjetero") ||
        combined.includes("accesorio") ||
        combined.includes("bandolera") ||
        combined.includes("llavero")
    ) {
        return "03-regalo"
    }

    if (
        combined.includes("04-a-medida") ||
        combined.includes("a medida") ||
        combined.includes("medida") ||
        combined.includes("imaginar") ||
        combined.includes("corporativo") ||
        combined.includes("especial")
    ) {
        return "04-a-medida"
    }

    return "01-trabajo"
}

export async function getCategories(): Promise<Category[]> {
    return PILLARS
}
