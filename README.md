# Webcam Filter App

A simple Angular application that accesses your webcam and applies various filters to the live video feed.

## Features

- **Webcam Access:** Requests access to your webcam and displays the live video feed.
- **Dynamic Filters:** Apply different filters such as grayscale and ASCII art in real time.
- **Pixelated Output:** Downscales the video for a pixelated effect, ideal for generating ASCII art.
- **Live Preview:** See changes immediately as filters are applied to the video.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [Angular CLI](https://angular.io/cli) (installed globally)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

### Running the Application

Start the development server with:

    ```bash
    ng serve
    ```

Open your browser and navigate to http://localhost:4200 to see the app in action.

### Usage

- **Grant Camera Access:** On startup, the app will request access to your webcam. Please allow access in your browser.
- **Apply Filters:** Use the provided UI controls to switch between different filters (e.g., grayscale, ASCII art).
- **View Results:** The live video feed will update in real time with the selected filter applied.

