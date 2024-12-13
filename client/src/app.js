
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ImageUpload from "./components/ImageUpload";
import ResultDisplay from "./components/ResultDisplay";

const App = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="border-b-2 border-[#136D86] mx-5"></div> 
      <main className="flex-grow container mx-auto p-4 flex">
        <div className="w-1/2 pr-4">
          <ImageUpload onResult={setResult} />
        </div>
        <div className="w-1/2 pl-4">
          <ResultDisplay result={result} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;