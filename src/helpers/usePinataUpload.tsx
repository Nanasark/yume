import { useState, useCallback } from "react";
import axios from "axios";

export default function usePinataUpload() {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Function to request a JWT from the server
  const getUploadToken = useCallback(async () => {
    try {
      const response = await axios.post("/api/getUploadToken"); // Assuming your backend endpoint
      return response.data.JWT; // Get the JWT from response
    } catch (error) {
      setUploadStatus("Failed to get upload token");
      throw new Error("Could not fetch upload token");
    }
  }, []);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file) {
        setUploadStatus("No file selected");
        return;
      }

      setIsUploading(true);
      setUploadStatus(null);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const JWT = await getUploadToken(); // Fetch JWT for upload

        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: Infinity,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${JWT}`, // Use the restricted JWT here
            },
          }
        );

        setUploadStatus(
          `File uploaded successfully! IPFS Hash: ${response.data.IpfsHash}`
        );
        return response.data;
      } catch (error: any) {
        setUploadStatus(`Upload failed: ${error.message}`);
        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [getUploadToken]
  );

  return { uploadFile, uploadStatus, isUploading };
}
