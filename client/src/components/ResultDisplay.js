import React from 'react';

const ResultDisplay = ({ result }) => {
    const { detectedText, annotatedImageUrl } = result;

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h3 className="card-title text-center mb-4">Recognition Results</h3>
                <p><strong>Detected Text:</strong> {detectedText}</p>
                {annotatedImageUrl && (
                    <div className="text-center">
                        <img
                            src={annotatedImageUrl}
                            alt="Annotated Result"
                            className="img-fluid"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultDisplay;