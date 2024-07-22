// // import React from "react";

// // type DB = {
// //   ipfsHash: string;
// // };

// // export default function DownloadButton() {
// //   const handleDownload = async () => {
// //     const downloadLink = document.createElement("a");
// //     downloadLink.href = `https://plum-tricky-rooster-637.mypinata.cloud/ipfs/QmYzNamfDbnfNy6QbbFgjMGbVKbfxB8VQsz38cq4UJdiz8`;
// //     downloadLink.download = "image.png";
// //     downloadLink.click();
// //   };

// //   return (
// //     <div>
// //       <button onClick={handleDownload}>Download File</button>
// //     </div>
// //   );
// // }

// const https = require("https");
// const fs = require("fs");
// const path = require("path");

// /**
//  * Function to download a file from Pinata's IPFS gateway
//  * @param {string} cid - The CID (Content Identifier) of the file to download
//  * @param {string} outputPath - The path where the file should be saved
//  */

// type down = {
//   cid:string
// }
// export default function downloadFileFromPinata({cid}:down) {
//   const url = `https://gateway.pinata.cloud/ipfs/${cid}`;

//   https
//     .get(url, (response:any) => {
//       const fileStream = fs.createWriteStream(outputPath);
//       response.pipe(fileStream);

//       fileStream.on("finish", () => {
//         fileStream.close();
//         console.log("File has been downloaded successfully.");
//       });
//     })
//     .on("error", (error:any) => {
//       console.error("Error downloading the file:", error);
//       fs.unlink(outputPath, () => {}); // Delete the file async. (E.g., in case of incomplete download)
//     });
// }

// // Example usage
// const cid = "YOUR_FILE_CID_HERE";
// const outputPath = path.join(__dirname, "downloaded.file");
// downloadFileFromPinata(cid);

