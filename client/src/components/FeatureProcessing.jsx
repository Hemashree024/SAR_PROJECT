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

  // eslint-disable-next-line no-unused-vars
  const debugLog = (message) => {
    console.log('[FeatureProcessing]', message);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-2">
              {feature ? featureTitles[feature] : ''}
            </h1>
            <p className="text-lg text-gray-400">Upload your image and let AI process it instantly</p>
          </div>
          <button
            className="btn-secondary px-6 py-3 rounded-lg hover:shadow-md transition-all duration-200"
            onClick={() => navigate('/select')}
          >
            ← Back to Features
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">Upload Image</h2>

            <div
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-500 transition"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-auto mx-auto rounded" />
              ) : (
                <div>
                  <div className="text-4xl mb-4 text-gray-300">📁</div>
                  <p className="text-gray-400">Drag and drop an image here, or click to select</p>
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
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition disabled:opacity-50"
                  onClick={handleProcess}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Process Image'}
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-700 text-red-300 rounded">
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
                <img src={processedUrl} alt="Processed" className="w-full h-auto mx-auto rounded mb-4" />
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
