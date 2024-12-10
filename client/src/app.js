import React from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload.js'; // import ImageUpload component

function App() {
  return (
    <div className="App">
      <h1>Text Recognition App</h1>
      <ImageUpload />  {/* Use the ImageUpload component */}
    </div>
  );
}

export default App;
