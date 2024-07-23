import { useOpenAuction } from "@/helpers/AuctionContext";
import Image from "next/image";
interface AuctionModalProps {
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => void;
  setCoverPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  coverPreviewUrl: string | null;
  selectedFile: File | null;
  setSelectedCover: React.Dispatch<React.SetStateAction<File | null>>;
  setselectedDisplay1: React.Dispatch<React.SetStateAction<File | null>>;
  setDisplay1PreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  display1PreviewUrl: string | null;
  display2PreviewUrl: string | null;
  setDisplay2PreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setselectedDisplay2: React.Dispatch<React.SetStateAction<File | null>>;
  setDisplay3PreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setselectedDisplay3: React.Dispatch<React.SetStateAction<File | null>>;
  display3PreviewUrl: string | null;
}

export default function AuctionModal({
  handleFileChange,
  setCoverPreviewUrl,
  setPreviewUrl,
  setSelectedFile,
  setSelectedCover,
  selectedFile,
  coverPreviewUrl,
  setDisplay1PreviewUrl,
  setselectedDisplay1,
  display1PreviewUrl,
  display2PreviewUrl,
  setDisplay2PreviewUrl,
  setselectedDisplay2,
  setselectedDisplay3,
  setDisplay3PreviewUrl,
  display3PreviewUrl,
}: AuctionModalProps) {
  const { isOpenAuction } = useOpenAuction();
  console.log("AuctionModalProvider value:", {
    isOpenAuction,
  });

  return (
    <div
      className={` ${
        isOpenAuction ? "visible" : "hidden"
      } flex gap-5  bg-gray-800`}
    >
      <div className="flex flex-col gap-10 p-5 ring ring-slate-600 rounded-xl bg-gradient-to-r from-slate-700 to-slate-700">
        <p>Upload File</p>

        <div className="flex flex-col gap-4 w-[350px]">
          <label
            htmlFor="customFileInput"
            className="cursor-pointer inline-block py-2 px-4 bg-blue-500 text-white rounded-lg text-center"
          >
            Choose file
          </label>
          <input
            className="hidden"
            type="file"
            id="customFileInput"
            onChange={(e) =>
              handleFileChange(e, setPreviewUrl, setSelectedFile)
            }
          />
          <span className="italic text-gray-500">
            {selectedFile ? selectedFile.name : "No file chosen"}
          </span>
        </div>
        <label>Upload Cover Image</label>
        <div className="flex gap-5 items-center justify-center w-[350px] h-[80px]  ">
          <div className="relative">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer">
              <div className="text-center">
                <p>Drag and Drop or </p>
                <p className="text-purple-700 cursor-pointer">select</p>
              </div>
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                onChange={(e) =>
                  handleFileChange(e, setCoverPreviewUrl, setSelectedCover)
                }
              />
            </div>
          </div>
          {coverPreviewUrl && (
            <Image
              className=" w-[100px] h-[100px] rounded-full"
              src={coverPreviewUrl}
              alt="Selected Image Preview"
              width={100}
              height={100}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-10 p-5 ring ring-slate-600 rounded-xl bg-gradient-to-r from-slate-700 to-slate-700">
        <label>Upload other Images or Videos below</label>
        <div className="flex gap-5 items-center justify-center w-[350px] h-[80px]  ">
          <div className="relative">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer">
              <div className="text-center">
                <p>Drag and Drop or </p>
                <p className="text-purple-700 cursor-pointer">select</p>
              </div>
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                onChange={(e) =>
                  handleFileChange(
                    e,
                    setDisplay1PreviewUrl,
                    setselectedDisplay1
                  )
                }
              />
            </div>
          </div>
          {display1PreviewUrl && (
            <Image
              className=" w-[100px] h-[100px] rounded-full"
              src={display1PreviewUrl}
              alt="Selected Image Preview"
              width={100}
              height={100}
            />
          )}
        </div>
        <div className="flex gap-5 items-center justify-center w-[350px] h-[80px]  ">
          <div className="relative">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer">
              <div className="text-center">
                <p>Drag and Drop or </p>
                <p className="text-purple-700 cursor-pointer">select</p>
              </div>
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                onChange={(e) =>
                  handleFileChange(
                    e,
                    setDisplay2PreviewUrl,
                    setselectedDisplay2
                  )
                }
              />
            </div>
          </div>
          {display2PreviewUrl && (
            <Image
              className=" w-[100px] h-[100px] rounded-full"
              src={display2PreviewUrl}
              alt="Selected Image Preview"
              width={100}
              height={100}
            />
          )}
        </div>
        <div className="flex gap-5 items-center justify-center w-[350px] h-[80px]  ">
          <div className="relative">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer">
              <div className="text-center">
                <p>Drag and Drop or </p>
                <p className="text-purple-700 cursor-pointer">select</p>
              </div>
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                onChange={(e) =>
                  handleFileChange(
                    e,
                    setDisplay3PreviewUrl,
                    setselectedDisplay3
                  )
                }
              />
            </div>
          </div>
          {display3PreviewUrl && (
            <Image
              className=" w-[100px] h-[100px] rounded-full"
              src={display3PreviewUrl}
              alt="Selected Image Preview"
              width={100}
              height={100}
            />
          )}
        </div>
      </div>
    </div>
  );
}
