import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { CloudUpload, Lock, Visibility, Person } from "@mui/icons-material";
import banner_image from "@/assets/banner-image.png";
import ScrollButton from "@/components/ScrollButton/ScrollButton";
import ImageUploadUI from "@/components/ImageUploadUI/ImageUploadUI";
import VideoUploadUI from "@/components/VideoUploadUI/VideoUploadUI";

export default function Home() {
  return (
    <main className="bg-gray-50 md:p-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How it Works */}
      <HowItWorksSection />

      {/* Upload Section */}
      <UploadSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

const HeroSection = () => (
  <Box
    className="relative w-full h-[500px] bg-cover bg-center"
    style={{ backgroundImage: `url(${banner_image.src})` }}
  >
    <Box className="absolute inset-0 bg-black opacity-50"></Box>
    <Box className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
      <Typography className="text-3xl md:text-5xl font-semibold">
        Manage Your Files Effortlessly
      </Typography>
      <Typography variant="body1" className="mt-4 mb-6 max-w-xl">
        Easily upload, manage, and preview your images and videos with just a few clicks. Perfect for professionals and creatives.
      </Typography>
      <ScrollButton />
    </Box>
  </Box>
);


const FeaturesSection = () => (
  <Box className="py-16 bg-white">
    <Typography variant="h4" align="center" className="mb-12">
      Why Choose Us
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {[
        { title: "Fast Uploads", description: "Experience lightning-fast upload speeds for both images and videos.", icon: <CloudUpload style={{ fontSize: 100 }} /> },
        { title: "Secure Storage", description: "Your files are stored securely with cloud backup and encryption.", icon: <Lock style={{ fontSize: 100 }} /> },
        { title: "Live Previews", description: "Get instant live previews for your images and videos after upload.", icon: <Visibility style={{ fontSize: 100 }} /> },
        { title: "User Friendly", description: "A simple and intuitive interface makes file management a breeze.", icon: <Person style={{ fontSize: 100 }} /> }
      ].map((feature, index) => (
        <Grid item xs={12} md={3} key={index} className="mx-2 md:mx-0">
          <Card className="text-center p-4">
            <Box className="flex justify-center">
              {feature.icon}
            </Box>
            <CardContent>
              <Typography variant="h6" className="font-semibold">
                {feature.title}
              </Typography>
              <Typography variant="body2" className="text-gray-600 mt-2">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const HowItWorksSection = () => (
  <Box className="py-16 bg-gray-100">
    <Typography variant="h4" align="center" className="mb-12">
      How It Works
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {[
        { step: "Upload", description: "Upload your image or video files." },
        { step: "Preview", description: "Get an instant live preview link." },
        { step: "Share", description: "Easily share your files with others." }
      ].map((item, index) => (
        <Grid item xs={12} md={4} key={index} className="mx-2 md:mx-0">
          <Card className="text-center p-4">
            <Typography variant="h6" className="font-semibold">
              Step {index + 1}: {item.step}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              {item.description}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const UploadSection = () => (
  <Box className="my-12 p-4" id="upload-section">
    <Typography variant="h4" align="center" className="mb-8">
      Start Uploading Your Files
    </Typography>
    <Grid container spacing={4} className="xl:w-max xl:mx-auto">
      <Grid item xs={12} sm={6} md={6} className="flex justify-center">
        <ImageUploadUI />
      </Grid>
      <Grid item xs={12} sm={6} md={6} className="flex justify-center">
        <VideoUploadUI />
      </Grid>
    </Grid>
  </Box>
);

const Footer = () => (
  <Box className="py-8 bg-gray-800 text-white">
    <Typography align="center" variant="body1">
      &copy; {new Date().getFullYear()} Your Company. All rights reserved.
    </Typography>
  </Box>
);
