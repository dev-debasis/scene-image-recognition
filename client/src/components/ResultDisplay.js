import React from "react";

const ResultDisplay = ({ result }) => {
  if (!result) {
    return null; // Render nothing if there's no result
  }

  return (
    <div className="mt-6 p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-4">Recognition Results</h2>
      {result.error ? (
        <p className="text-red-500">Error: {result.error}</p>
      ) : (
        <>
          <h3 className="text-md font-semibold mb-2">Detected Text:</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {result.detected_text}
          </p>

          {result.annotated_image_path && (
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2">Annotated Image:</h3>
              <img
                src={
                  result.annotated_image_path.startsWith("http")
                    ? result.annotated_image_path
                    : `http://localhost:5000/${result.annotated_image_path}`
                }
                alt="Annotated Result"
                className="max-w-full h-auto border rounded-lg"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResultDisplay;
