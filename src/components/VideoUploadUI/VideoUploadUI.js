"use client";

import { useState } from "react";
import { Box, Button, Alert, CircularProgress, TextField, Card, Typography, Grid } from "@mui/material";
import axios from "axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const MAX_VIDEO_SIZE_MB = 30;

const VideoUploadUI = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [liveLink, setLiveLink] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size / (1024 * 1024) > MAX_VIDEO_SIZE_MB) {
        setError(`File size exceeds ${MAX_VIDEO_SIZE_MB} MB. Please select a smaller video under 30 MB.`);
        setFile(null);
      } else {
        setFile(selectedFile);
        setError(null);
        setSuccess(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!title) {
      setError("Title is required.");
      return;
    }
    if (!file) {
      setError("Please select a video first.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", String(file.size));

    try {
      const response = await axios.post("/api/video-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLiveLink(response.data.liveUrl);
      setSuccess("Video uploaded successfully!");
      
      setTitle("");
      setDescription("");
      setFile(null);
      
      document.getElementById("video-file-input").value = null; 
    } catch (err) {
      setError("Video upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 shadow-lg w-full max-w-lg mx-auto">
      <Typography variant="h4" align="center" gutterBottom>
        Upload Your Video
      </Typography>

      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      {success && <Alert severity="success" className="mb-4">{success}</Alert>}

      <Grid container spacing={2} className="mb-4">
        <Grid item xs={12}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="outlined"
            error={!title && error}
            helperText="Title is required."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            variant="outlined"
            helperText="You can add a description for the video."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="video-file-input"
            type="file"
            onChange={handleFileChange}
            fullWidth
            variant="outlined"
            inputProps={{ accept: "video/*" }}
            helperText="Choose a video to upload (Max size: 30 MB)"
            error={!!error}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={loading || !file}
            startIcon={!loading && <CloudUploadIcon />}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Upload Video"}
          </Button>
        </Grid>
      </Grid>

      {liveLink && (
        <Box mt={4} textAlign="center">
          <Alert severity="info">
            Video Live Link: <a href={liveLink} target="_blank" rel="noopener noreferrer">{liveLink}</a>
          </Alert>
        </Box>
      )}
    </Card>
  );
};

export default VideoUploadUI;
