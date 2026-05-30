# Major Project Integration - 7th Semester

A comprehensive full-stack application integrating multiple deep learning models for image processing tasks including building detection, road detection, and image colorization.

## 📋 Table of Contents

- [Features](#features)
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Modules](#project-modules)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Support](#support)

## ✨ Features

### Core Capabilities
- **Building Detection**: Detect and localize buildings in satellite/aerial images using deep learning
- **Road Detection**: Identify and extract road networks from images
- **Image Colorization**: Automatically colorize grayscale images using neural networks
- **Real-time Processing**: Process images with fast inference times
- **Batch Processing**: Handle multiple images in a single request
- **Web Interface**: User-friendly React-based frontend for easy interaction

### Technical Highlights
- Pre-trained deep learning models using PyTorch
- GPU acceleration support (CUDA-enabled for faster processing)
- Comprehensive error handling and validation
- Cross-origin request support (CORS enabled)
- Responsive design with Tailwind CSS
- Smooth animations and modern UI with Framer Motion

## 📁 Project Overview

This is a **full-stack web application** designed for semantic image analysis and processing. The project consists of:

- **Backend**: Flask-based REST API with integrated ML models
- **Frontend**: React.js application with TypeScript support
- **ML Modules**: Pre-trained deep learning models for specialized tasks

## 🏗️ Project Structure

```
├── backend/                    # Flask backend server
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt        # Python dependencies
│   ├── Procfile               # Deployment configuration
│   ├── uploads/               # Temporary file storage
│   └── processed/             # Processed output storage
│
├── client/                     # React frontend application
│   ├── public/                # Static assets
│   ├── src/                   # Source code
│   │   ├── components/        # React components
│   │   ├── App.tsx            # Main app component
│   │   └── index.js           # Entry point
│   ├── package.json           # Frontend dependencies
│   └── tailwind.config.js     # Tailwind CSS configuration
│
├── modules/                    # ML modules
│   ├── building_detection/    # Building detection model
│   │   ├── model/             # Model architecture
│   │   ├── checkpoints/       # Pre-trained weights
│   │   └── predict.py         # Inference script
│   │
│   ├── road_detection/        # Road detection model
│   │   ├── unet.py            # Model definition
│   │   ├── checkpoints/       # Pre-trained weights
│   │   └── predict.py         # Inference script
│   │
│   └── colorization/          # Image colorization model
│       ├── model/             # Model architecture
│       ├── checkpoints/       # Pre-trained weights
│       └── predict.py         # Inference script
│
├── HARDWARE_SOFTWARE_REQUIREMENTS.md   # Detailed requirements
└── README.md                           # This file
```

## 💻 Requirements

### Quick Summary
- **Python**: 3.8 - 3.11
- **Node.js**: 14+ (for frontend)
- **RAM**: 8GB minimum (16GB recommended)
- **Storage**: 20GB+ for models and dependencies

For detailed hardware and software requirements, see [HARDWARE_SOFTWARE_REQUIREMENTS.md](HARDWARE_SOFTWARE_REQUIREMENTS.md).

## 🚀 Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 14 or higher
- pip (Python package manager)
- npm or yarn (Node package manager)
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate
   
   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install Node dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

## 📖 Usage

### Running the Application

#### Start Backend Server

```bash
# From project root, navigate to backend
cd backend

# Activate virtual environment (if not already activated)
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Run Flask app
python app.py
```

The backend will be available at `http://localhost:5000` (default)

#### Start Frontend Development Server

In a new terminal:

```bash
# From project root, navigate to client
cd client

# Start development server
npm start
```

The frontend will automatically open at `http://localhost:3000`

### Building for Production

**Frontend Build**
```bash
cd client
npm run build
```

This creates an optimized production build in the `build/` directory.

## 🛠️ Available Scripts

### Frontend Scripts
```bash
npm start       # Start development server
npm run build   # Create production build
npm test        # Run tests
npm run eject   # Eject from Create React App (irreversible)
```

### Backend
```bash
python app.py   # Start Flask development server
```

## 🧠 Project Modules

### 1. Building Detection
- **Purpose**: Detect buildings in satellite/aerial imagery
- **Model**: U-Net based architecture
- **Location**: `modules/building_detection/`
- **Input**: Satellite images (JPEG, PNG)
- **Output**: Binary mask or detection coordinates

### 2. Road Detection
- **Purpose**: Identify road networks and infrastructure
- **Model**: U-Net based segmentation model
- **Location**: `modules/road_detection/`
- **Input**: Aerial/satellite images
- **Output**: Road segmentation mask

### 3. Image Colorization
- **Purpose**: Automatically colorize grayscale images
- **Model**: GAN-based colorization generator
- **Location**: `modules/colorization/`
- **Input**: Grayscale images
- **Output**: Colored images in RGB

## 🔧 Technologies Used

### Backend
- **Framework**: Flask 2.3.3
- **Deep Learning**: PyTorch 2.0.1
- **Image Processing**: OpenCV 4.8.1, Pillow 10.0.0
- **Numerical Computing**: NumPy 1.24.3
- **Server**: Werkzeug 2.3.7
- **CORS**: Flask-CORS 4.0.0

### Frontend
- **Framework**: React 18.2.0
- **Language**: TypeScript / JavaScript (ES6+)
- **Routing**: React Router DOM 6.14.1
- **HTTP Client**: Axios 1.4.0
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: Framer Motion 10.12.16
- **Build Tool**: Create React App (Webpack)

### ML & Vision
- **PyTorch**: Deep learning framework
- **TorchVision**: Vision utilities and pre-trained models
- **OpenCV**: Computer vision library
- **NumPy**: Numerical computations

## 🔌 API Endpoints

The backend exposes RESTful API endpoints for each module. Common endpoint structure:

```
POST /api/building-detection    # Building detection
POST /api/road-detection        # Road detection
POST /api/colorize              # Image colorization
GET  /api/health                # Server health check
```

**Note**: Exact endpoints depend on backend implementation. Check `backend/app.py` for complete API documentation.

## 🤝 Contributing

### Code Style
- **Backend**: Follow PEP 8 Python conventions
- **Frontend**: Use ESLint and Prettier for formatting
- **Commits**: Use descriptive commit messages

### Workflow
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m "Add your message"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a pull request

## 📝 Notes

- **Model Checkpoints**: Pre-trained model weights are stored in `checkpoints/` directories within each module
- **GPU Support**: The application can leverage NVIDIA GPUs with CUDA for faster inference (optional)
- **Environment Variables**: Create a `.env` file in the backend directory if needed for configuration
- **Temporary Files**: Uploaded files are stored in `backend/uploads/` and processed outputs in `backend/processed/`

## 📞 Support

For issues, questions, or suggestions:
- Check existing documentation in `HARDWARE_SOFTWARE_REQUIREMENTS.md`
- Review the `TODO.md` file for ongoing tasks
- Create an issue in the repository

## 📄 License

This project is part of a 7th semester academic assignment.

---

**Last Updated**: May 2026  
**Version**: 1.0.0
