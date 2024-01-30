// import React from "react";
// import {
//   Box,
//   HStack,
//   Button,
//   IconButton,
//   Grid,
//   GridItem,
//   Image,
// } from "@chakra-ui/react";
// import { FaChevronRight, FaChevronLeft, FaPlus, FaMinus } from "react-icons/fa";
// import { GrPowerReset } from "react-icons/gr";
// import { useState } from "react";

// const PdfView = ({ extractedFiles, selectedFile }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const pdfPages = extractedFiles[0].pdfPages;
//   const [zoomLevel, setZoomLevel] = useState(1);

//   return (
//     <HStack justifyContent={"space-between"} px={2} w={"100vw"}>
//       <IconButton
//         aria-label="Previous Page"
//         icon={<FaChevronLeft />}
//         transform="translateY(-50%)"
//         zIndex={2}
//         isDisabled={currentPage === 0}
//         onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
//       />
//       {/* {pdfPages.map((dataUrl, index) => ( */}
//       <Box
//         // key={index}
//         px={1}
//         py={1}
//         border="2px solid #ccc"
//         borderRadius="md"
//         boxShadow="md"
//         h={"100%"}
//         bg={"gray.600"}
//         transform={`scale(${zoomLevel})`}
//         transformOrigin="top left"
//         overflow="auto"
//       >
//         <Image
//           src={
//             selectedFile
//               ? selectedFile.pdfPages[currentPage]
//               : pdfPages[currentPage]
//           }
//           alt={`Page ${currentPage + 1}`}
//           fit="contain"
//           align="center"
//           w="100%"
//           h="100%"
//         />
//       </Box>
//       {/* ))} */}
//       <IconButton
//         aria-label="Next Page"
//         icon={<FaChevronRight />}
//         transform="translateY(-50%)"
//         zIndex={2}
//         isDisabled={
//           currentPage ===
//           (selectedFile
//             ? selectedFile.pdfPages.length - 1
//             : pdfPages.length - 1)
//         }
//         onClick={() =>
//           setCurrentPage((prevPage) =>
//             Math.min(
//               prevPage + 1,
//               selectedFile
//                 ? selectedFile.pdfPages.length - 1
//                 : pdfPages.length - 1
//             )
//           )
//         }
//       />
//     </HStack>
//   );
// };

// export default PdfView;
