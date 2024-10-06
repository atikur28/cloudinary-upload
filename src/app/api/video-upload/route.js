import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

export async function POST(request) {
    try {
        if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
            return NextResponse.json({ error: "Cloudinary credentials not found" }, { status: 500 });
        }

        const formData = await request.formData();
        const file = formData.get("file");
        const title = formData.get("title");
        const description = formData.get("description");
        const originalSize = formData.get("originalSize");

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        console.log("Buffer size:", buffer.length);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "video",
                    folder: "cloudinary-video-upload",
                    transformation: [
                        { quality: "auto", fetch_format: "mp4" }
                    ]
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    } else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        const video = await prisma.video.create({
            data: {
                title,
                description,
                publicId: result.public_id,
                originalSize,
                compressedSize: String(result.bytes),
                duration: result.duration || 0,
            }
        });

        const liveUrl = `https://res.cloudinary.com/${process.env.CLOUD_NAME}/video/upload/${result.public_id}`;

        return NextResponse.json({
            video,
            publicId: result.public_id,
            liveUrl
        });

    } catch (error) {
        console.error("Video upload failed", error.message);
        return NextResponse.json({ error: "Video upload failed" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
