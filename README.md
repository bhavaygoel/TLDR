# TLDR - Webpage Content Summarizer

TLDR is a Chrome extension that summarizes the content present on a webpage. It uses EdgeGPT API for text summarization. The extension is built with Vite + React (TypeScript) for the frontend, Tailwind CSS for styling, and Python Flask for the backend.

## Features

- Summarize the content on any webpage.
- Choose between detailed or point-wise summarization.
- Easy-to-use Chrome extension.

## How It Works

When you open a webpage in your Chrome browser, the TLDR extension detects the URL and sends it to the backend server built with Python Flask. The server uses the EdgeGPT API to generate the summary and returns it to the frontend, which displays it to the user.

## Installation

1. Clone this repository to your local machine.
2. Open the `frontend` folder in your code editor and install dependencies using `npm install`.
3. Open the `backend` folder in your code editor and create a virtual environment using `python -m venv venv`. Activate the virtual environment with `source venv/bin/activate` (on Windows, use `venv\Scripts\activate`).
4. Install Python dependencies using `pip install -r requirements.txt`.
5. Start the backend server with `python app.py`.
6. Load the frontend in Chrome using the following steps:
   - Open `chrome://extensions/` in a new tab.
   - Turn on Developer mode (top-right corner).
   - Click "Load unpacked" and select the `frontend` folder.

## Usage

1. Open a webpage that you want to summarize.
2. Click on the TLDR extension icon in the Chrome toolbar.
3. The extension will generate and display the summary on the page.

