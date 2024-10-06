"use client";

import { useState, useRef } from "react";
import { Box, Button, Alert, CircularProgress, TextField, Card, Typography, Grid } from "@mui/material";
import axios from "axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUploadUI = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [liveLink, setLiveLink] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setSuccess(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/image-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLiveLink(response.data.liveUrl);
      setSuccess("Image uploaded successfully!");
      setFile(null);
      fileInputRef.current.value = "";
    } catch (err) {
      setError("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 shadow-lg w-full max-w-lg mx-auto">
      <Typography variant="h4" align="center" gutterBottom>
        Upload Your Image
      </Typography>

      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      {success && <Alert severity="success" className="mb-4">{success}</Alert>}

      <Grid container spacing={2} className="mb-4">
        <Grid item xs={12}>
          <TextField
            type="file"
            inputRef={fileInputRef}
            onChange={handleFileChange}
            fullWidth
            variant="outlined"
            inputProps={{ accept: "image/*" }}
            helperText="Choose an image to upload"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#888',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
              '& .MuiFormHelperText-root': {
                marginTop: '4px',
                color: '#888',
                fontStyle: 'italic',
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
            {loading ? <CircularProgress size={24} /> : "Upload Image"}
          </Button>
        </Grid>
      </Grid>

      {liveLink && (
        <Box mt={4} textAlign="center">
          <Alert severity="info">
            Image Live Link: <a href={liveLink} target="_blank" rel="noopener noreferrer">{liveLink}</a>
          </Alert>
        </Box>
      )}
    </Card>
  );
};

export default ImageUploadUI;
