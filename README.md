# 📹 Video Upload Platform with Next.js

[![Live Demo](https://cloudinary-upload-green.vercel.app/)](https://cloudinary-upload-green.vercel.app/)

This project is a **Video Upload Platform** built using modern technologies like **Next.js**, **Material UI (MUI)**, **Axios**, **Tailwind CSS**, **Prisma**, and **Cloudinary**. It enables users to upload videos, provide titles and descriptions, and obtain a live URL for sharing their videos.

## ✨ Features

- **Video Upload**: Users can upload video files (up to 30 MB).
- **Video Metadata**: Add a title and description for better management and display of uploaded videos.
- **Live Video URL**: After a successful upload, users can share the video via a generated live link.
- **Error Handling**: Graceful error messages for invalid video formats, oversized files, and failed uploads.
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

1. **Upload a Video**: Select a video file (under 30MB) and add a title and description.
2. **Submit**: The platform uploads the video to Cloudinary and stores metadata in the database via Prisma.
3. **Get a Shareable Link**: Once the upload is complete, a live link is generated and displayed to the user for sharing.

## 🖥️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
