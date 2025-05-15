// src/app/api/list-menus/route.ts
import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// L'interface que nous attendons de stocker et de renvoyer
interface MenuFileMetadata {
  id: string;
  name: string;
  type: string;
  blobUrl: string;
  pathname: string;
  uploadDate: string;
  contentType: string;
  size: number;
}

const MENUS_KV_KEY = "allSiteMenuFiles"; // Assure-toi que cette clé est la même PARTOUT

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const allMenusData: unknown = await kv.get(MENUS_KV_KEY); // Récupérer comme 'unknown' d'abord

    // Vérifier si les données sont un tableau et si chaque élément a les propriétés attendues
    // C'est une validation simple, tu pourrais utiliser une bibliothèque comme Zod pour une validation plus poussée.
    if (
      Array.isArray(allMenusData) &&
      allMenusData.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "id" in item &&
          "name" in item &&
          "blobUrl" in item
      )
    ) {
      // Si c'est un tableau valide de nos objets MenuFileMetadata
      return NextResponse.json(allMenusData as MenuFileMetadata[]);
    } else {
      // Si les données ne sont pas un tableau ou si la structure est incorrecte,
      // ou si la clé n'existe pas (kv.get renverra null), renvoyer un tableau vide.
      console.warn(
        `Data from KV key "${MENUS_KV_KEY}" was not a valid array of menus or was null. Returning empty array. Data:`,
        allMenusData
      );
      return NextResponse.json([]);
      //done
    }
  } catch (error) {
    console.error(`Error fetching menus from KV key "${MENUS_KV_KEY}":`, error);
    // En cas d'erreur de communication avec KV, renvoyer une erreur 500 avec un tableau vide aussi.
    return NextResponse.json(
      { error: "Failed to fetch menus due to a server error." },
      { status: 500 }
    );
    // Ou pour le client, renvoyer un tableau vide pour éviter un plantage :
    // return NextResponse.json([], { status: 500 });
  }
}

// Pour s'assurer que cette API n'est pas mise en cache de manière agressive par Next.js/Vercel
// Surtout pendant le développement. Pour la production, tu pourras revoir cette stratégie.
export const dynamic = "force-dynamic";
