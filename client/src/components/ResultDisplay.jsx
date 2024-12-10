// import React from 'react';

// const ResultDisplay = ({ text, imageUrl }) => {
//   if (!text && !imageUrl) return null;

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold mb-2">Detected Text:</h2>
//       <p className="text-gray-800 mb-4">{text || 'No text detected.'}</p>
//       {imageUrl && (
//         <div>
//           <h2 className="text-lg font-bold mb-2">Annotated Image:</h2>
//           <img src={imageUrl} alt="Annotated Result" className="max-w-full border rounded" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResultDisplay;



const ResultDisplay = ({ result }) => {
    if (!result) {
      return <div>Loading...</div>; // Handle loading or error state
    }
  
    const { detectedText } = result;
  
    return (
      <div>
        <h1>Detected Text</h1>
        <p>{detectedText}</p>
      </div>
    );
  };
  