// src/app/api/upload-menu/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";

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

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const menuType = formData.get("menuType") as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!menuType) {
    return NextResponse.json(
      { error: "Menu type not specified." },
      { status: 400 }
    );
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Only PDF files are allowed." },
      { status: 400 }
    );
  }

  const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
  const blobFilename = `${menuType}/${nanoid(8)}-${sanitizedFilename}`; // nanoid(8) for shorter ID part

  try {
    const blob = await put(blobFilename, file, {
      access: "public",
      contentType: file.type,
    });

    const menuId = nanoid();
    const newMenuData: MenuFileMetadata = {
      id: menuId,
      name: file.name,
      type: menuType,
      blobUrl: blob.url,
      pathname: blob.pathname,
      uploadDate: new Date().toISOString(),
      contentType: file.type,
      size: file.size,
    };

    const MENUS_KV_KEY = "allSiteMenuFiles"; // Use a distinct key
    let allMenus: MenuFileMetadata[] = (await kv.get(MENUS_KV_KEY)) || [];

    // Ensure allMenus is an array before pushing
    if (!Array.isArray(allMenus)) {
      allMenus = [];
    }
    allMenus.push(newMenuData);
    await kv.set(MENUS_KV_KEY, allMenus);

    return NextResponse.json({
      message: "File uploaded and metadata saved successfully!",
      url: blob.url,
      menuData: newMenuData,
    });
  } catch (error) {
    console.error("Error during upload or KV operation:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json(
      { error: `Upload failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
