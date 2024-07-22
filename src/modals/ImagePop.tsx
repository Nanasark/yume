// import { useState } from "react";

// const ImageWithModal = ({ client, auction }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   return (
//     <>
//       <div className="w-[300px] h-[300px]" onClick={openModal}>
//         <MediaRenderer
//           client={client}
//           className="relative border-amber-800 rounded-lg border-[2px] w-full h-full object-cover"
//           src={`ipfs://${auction.display1}`}
//         />
//       </div>

//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="relative bg-white p-4 rounded-lg">
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-700"
//             >
//               &times;
//             </button>
//             <img
//               src={`ipfs://${auction.display1}`}
//               alt="Image"
//               className="max-w-full max-h-full"
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ImageWithModal;

// <div className="w-[300px] h-[300px]">
//   <a
//     href={`https://b6dd93abf3d0bba0dd32ed833b77fac3.ipfscdn.io/ipfs/${auction.display1}`}
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <MediaRenderer
//       client={client}
//       className="relative border-amber-800 rounded-lg border-[2px] w-full h-full object-cover"
//       src={`ipfs://${auction.display1}`}
//     />
//   </a>
// </div>;
