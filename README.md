# 📹 Image & Video Upload Platform with Next.js

[Live Demo](https://cloudinary-upload-green.vercel.app/)

This project is a **Image & Video Upload Platform** built using modern technologies like **Next.js**, **Material UI (MUI)**, **Axios**, **Tailwind CSS**, **Prisma**, and **Cloudinary**. It enables users to upload videos and images, provide titles and descriptions, and obtain live URLs for sharing their media.

## ✨ Features

- **Video Upload**: Users can upload video files (up to 30 MB).
- **Image Upload**: Users can upload image files (up to 5 MB) alongside videos.
- **Media Metadata**: Add titles and descriptions for uploaded videos for better management and display.
- **Live Media URL**: After a successful upload, users can share both images and videos via generated live links.
- **Error Handling**: Graceful error messages for invalid media formats, oversized files, and failed uploads.
- **Responsive Design**: Fully responsive UI using Material UI and Tailwind CSS for seamless experiences on all devices.
- **Fast and Secure**: Built with Next.js for fast server-side rendering and Prisma for secure data management.

## 🚀 Technologies Used

- **[Next.js](https://nextjs.org/docs)**: React framework for building fast, scalable web applications.
- **[Material UI (MUI)](https://mui.com/)**: UI component library for creating sleek and modern designs.
- **[Axios](https://axios-http.com/)**: Promise-based HTTP client for making API requests.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for quickly designing responsive layouts.
- **[Prisma](https://www.prisma.io/)**: ORM for database access and schema management.
- **[Cloudinary](https://cloudinary.com/)**: Cloud-based media management solution for image and video uploads.

## 🎯 How It Works

1. **Upload a Video**: Users can select a video file (under 30MB) and add a title and description.
2. **Upload an Image**: Users can select an image file (under 5MB).
3. **Submit**: The platform uploads the video and image to Cloudinary and stores their metadata in the database via Prisma.
4. **Get Shareable Links**: Once the uploads are complete, live links for both the images and videos are generated and displayed for users to share.

## 🖥️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
