// src/app/api/delete-menu/route.ts
import { NextResponse } from "next/server";
import { del as deleteBlob } from "@vercel/blob";
import { kv } from "@vercel/kv";

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

const MENUS_KV_KEY = "allSiteMenuFiles"; // Use the same distinct key

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { menuIdToDelete } = await request.json();

    if (!menuIdToDelete) {
      return NextResponse.json(
        { error: "Menu ID to delete not provided." },
        { status: 400 }
      );
    }

    let allMenus: MenuFileMetadata[] = (await kv.get(MENUS_KV_KEY)) || [];
    if (!Array.isArray(allMenus)) {
      // Safety check
      allMenus = [];
    }
    const menuToDelete = allMenus.find((menu) => menu.id === menuIdToDelete);

    if (!menuToDelete) {
      return NextResponse.json(
        { error: "Menu not found in KV store." },
        { status: 404 }
      );
    }

    if (menuToDelete.pathname) {
      await deleteBlob(menuToDelete.pathname);
    } else {
      console.warn(
        `Menu ${menuToDelete.id} did not have a pathname for Vercel Blob deletion.`
      );
    }

    const updatedMenus = allMenus.filter((menu) => menu.id !== menuIdToDelete);
    await kv.set(MENUS_KV_KEY, updatedMenus);

    return NextResponse.json({
      message: `Menu "${menuToDelete.name}" deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting menu:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json(
      { error: `Deletion failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
