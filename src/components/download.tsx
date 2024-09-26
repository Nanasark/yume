import { download } from "thirdweb/storage";
import { client } from "@/app/client";

/**
 * Downloads a file from IPFS and saves it with a specified filename.
 *
 * @param {string} uri The IPFS URI of the file to be downloaded.
 * @param {string} defaultFilename A default filename to use if the user doesn't specify one.
 */

type db = {
  uri: string;
  name: string;
};
export default function FileDownload({ uri, name }: db) {
  const downloadFile = async (defaultFilename = `${name} --ARYM`) => {
    try {
      const file = await download({ client, uri });

      // Get the blob of the file and determine its MIME type
      const fileBlob = await file.blob();
      const fileExtension = fileBlob.type.split("/")[1] || "jpg"; // Default to jpg if unknown
      const filename = `${defaultFilename}.${fileExtension}`;

      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download the file:", error);
    }
  };

  return (
    <div>
      File Purchased
      <div className=" text-[#D6D6D6] w-[150px] h-[45px]  bg-transparent flex  flex-col gap-2 items-center justify-center rounded-[11px] p-[1px] buttonHover">
        <button
          className="w-full rounded-[10px] border-[1px] border-[#262830]  hover:border-[0px] hover:bg-[#1B1C22] h-full "
          onClick={() => downloadFile()}
        >
          Download Now
        </button>
      </div>
    </div>
  );
}
