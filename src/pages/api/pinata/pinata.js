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

// const PINATA_JWT =`Bearer ${process.env.PINATA_JWT}`
// const fs = require("fs");
// const axios = require('axios')
// const FormData = require('form-data')
// require('dotenv').config()

// export const pinFileToIPFS = async () => {
//     const formData = new FormData();
//     const src = "path/to/file.png" ;

//     const file = fs.createReadStream(src);
//     formData.append('file', file);

//     const pinataMetadata = JSON.stringify({
//       name: 'File name',
//     });
//     formData.append('pinataMetadata', pinataMetadata);

//     try {
//       const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//         maxBodyLength: "Infinity",
//         headers: {
//           'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
//           Authorization: PINATA_JWT
//         }
//       });
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
// }

// pinFileToIPFS();
