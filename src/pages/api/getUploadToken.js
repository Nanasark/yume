import axios from "axios";
import KeyConfig from "@/Strings/config";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const keyRestrictions = {
      keyName: "Signed Upload JWT",
      maxUses: 1,
      permissions: {
        endpoints: {
          pinning: {
            pinFileToIPFS: true,
          },
        },
      },
    };

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/users/generateApiKey",
        keyRestrictions,
        {
          headers: {
            Authorization: `Bearer ${KeyConfig.pinataJWT}`,
            "Content-Type": "application/json",
          },
        }
      );

      const JWT = response.data.JWT;
      res.status(200).json({ JWT });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
