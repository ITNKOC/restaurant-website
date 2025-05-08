// src/app/api/upload-menu/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  v2 as cloudinary,
  UploadApiResponse, // Type importé directement
  UploadApiErrorResponse, // Type pour les erreurs, importé directement
} from "cloudinary";
import { Readable } from "stream"; // Nécessaire pour manipuler le flux du fichier

// Configuration de Cloudinary avec vos identifiants
// Idéalement, ceux-ci devraient être stockés dans des variables d'environnement
// Exemple: process.env.CLOUDINARY_CLOUD_NAME
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "djin03bhl",
  api_key: process.env.CLOUDINARY_API_KEY || "597292933448856",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "aCNEM6PIob_eONzKvFD7uQhvLaM",
  secure: true, // Utiliser HTTPS pour les URLs
});

// Fonction utilitaire pour convertir un ReadableStream (Web API) en Buffer (Node.js)
async function streamToBuffer(
  readableStream: ReadableStream<Uint8Array>
): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const reader = readableStream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (value) {
        chunks.push(value);
      }
    }
    return Buffer.concat(chunks);
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier téléversé." },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier (uniquement PDF)
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Seuls les fichiers PDF sont autorisés." },
        { status: 400 }
      );
    }

    // Convertir le fichier (File API) en Buffer pour l'upload
    // file.stream() retourne un ReadableStream<Uint8Array>
    const fileBuffer = await streamToBuffer(file.stream());

    // Téléverser le buffer vers Cloudinary
    const uploadResult = await new Promise<UploadApiResponse | undefined>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "restaurant_menus", // Dossier de destination sur Cloudinary
            resource_type: "raw", // Type de ressource pour les PDF et autres fichiers bruts
            format: "pdf", // Spécifier le format aide Cloudinary à l'identifier
          },
          // Utiliser les types importés pour le callback
          (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
            if (error) {
              console.error("Cloudinary Upload Error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        // Créer un Readable stream Node.js à partir du Buffer pour le pipe vers Cloudinary
        Readable.from(fileBuffer).pipe(uploadStream);
      }
    );

    if (!uploadResult || !uploadResult.secure_url) {
      console.error(
        "Échec de l'upload Cloudinary ou secure_url non trouvée:",
        uploadResult
      );
      return NextResponse.json(
        { error: "Échec de l'upload vers Cloudinary." },
        { status: 500 }
      );
    }

    // Renvoyer l'URL sécurisée et le public_id (utile pour la suppression future)
    return NextResponse.json(
      {
        message: "Fichier téléversé avec succès!",
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API d'upload:", error);
    let errorMessage = "Erreur inconnue lors de l'upload.";
    let errorDetails: any = error;

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    // Si l'erreur provient de Cloudinary et a une structure spécifique
    if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as any).message;
    }

    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de l'upload.",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
