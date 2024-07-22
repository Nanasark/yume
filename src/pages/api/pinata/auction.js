import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import KeyConfig from "@/Strings/config";

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's body parser
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const file = req.file;
      const formData = new FormData();
      formData.append("file", file.buffer, file.originalname);

      try {
        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: `Bearer ${KeyConfig.pinataJWT}`,
            },
          }
        );

        return res.status(200).json({ data: response.data });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
