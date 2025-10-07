import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FeatureProcessing = () => {
  const { feature } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [processedUrl, setProcessedUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const featureTitles = {
    building: 'Building Detection',
    road: 'Road Detection',
    colorization: 'Image Colorization'
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setProcessedUrl(null);
      setError(null);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setProcessedUrl(null);
      setError(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleProcess = async () => {
    if (!selectedFile || !feature) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Upload file
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadResponse = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { filename } = uploadResponse.data;

      // Process image
      const processResponse = await axios.post(`http://localhost:5000/process/${feature}`, {
        filename,
      });

      const { processed_filename } = processResponse.data;
      setProcessedUrl(`http://localhost:5000/processed/${processed_filename}`);
    } catch (err) {
      setError('Processing failed. Please try again.');
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedUrl) {
      const link = document.createElement('a');
      link.href = processedUrl;
      link.download = `processed_${feature}_${Date.now()}.png`;
      link.click();
    }
  };

  const handleShare = () => {
    if (processedUrl) {
      navigator.clipboard.writeText(processedUrl);
      alert('Image URL copied to clipboard!');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{feature ? featureTitles[feature] : ''}</h1>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            onClick={() => navigate('/select')}
          >
            Back to Features
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-64 mx-auto rounded" />
              ) : (
                <div>
                  <div className="text-4xl mb-4">📁</div>
                  <p className="text-gray-600">Drag and drop an image here, or click to select</p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {selectedFile && (
              <div className="mt-4">
                <button
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                  onClick={handleProcess}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Process Image'}
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Result</h2>

            {isProcessing && (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {processedUrl && !isProcessing && (
              <div>
                <img src={processedUrl} alt="Processed" className="max-w-full max-h-64 mx-auto rounded mb-4" />
                <div className="flex space-x-4">
                  <button
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                    onClick={handleShare}
                  >
                    Share
                  </button>
                </div>
              </div>
            )}

            {!processedUrl && !isProcessing && (
              <div className="flex items-center justify-center h-64 text-gray-500">
                Processed image will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureProcessing;
