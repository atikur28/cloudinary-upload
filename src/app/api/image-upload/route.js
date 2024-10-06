import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "cloudinary-image-upload" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        const liveUrl = `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/${result.public_id}`;

        return NextResponse.json({ liveUrl }, { status: 200 });

    } catch (error) {
        console.log("Image upload failed", error);
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }
}
