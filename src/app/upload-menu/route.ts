// src/app/api/upload-menu/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream"; // Nécessaire pour manipuler le flux du fichier

// Configuration de Cloudinary avec vos identifiants
// Ils seront stockés dans des variables d'environnement (voir Étape 4)
cloudinary.config({
  cloud_name: "djin03bhl",
  api_key: "597292933448856",
  api_secret: "aCNEM6PIob_eONzKvFD7uQhvLaM",
  secure: true, // Utiliser HTTPS pour les URLs
});

// Fonction utilitaire pour convertir un ReadableStream en Buffer
async function streamToBuffer(readableStream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of readableStream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
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

    // Convertir le fichier en Buffer pour l'upload
    // Le `file.stream()` retourne un ReadableStream
    const fileBuffer = await streamToBuffer(
      file.stream() as unknown as Readable
    );

    // Téléverser le buffer vers Cloudinary
    // resource_type: 'raw' est important pour les fichiers non-image comme les PDF
    // Vous pouvez spécifier un dossier ('folder') dans Cloudinary
    const uploadResult = await new Promise<
      cloudinary.UploadApiResponse | undefined
    >((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "restaurant_menus", // Dossier de destination sur Cloudinary
          resource_type: "raw", // Type de ressource pour les PDF
          format: "pdf", // Spécifier le format aide Cloudinary
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(fileBuffer);
    });

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
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erreur inconnue lors de l'upload.";
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de l'upload.",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
