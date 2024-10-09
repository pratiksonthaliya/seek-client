# Seek - AI Code Generator

Seek is a web application that leverages the Blackbox.ai wrapper to fetch code snippets based on user prompts. Users can input specific coding requests, and the application will generate the corresponding code, facilitating a more efficient coding experience.

## Features

- **User-Friendly Interface**: A simple and intuitive interface for users to input coding prompts.
- **Code Generation**: Fetch code snippets in real-time based on user prompts.
- **Markdown Preview**: View generated code in a markdown preview.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Technologies Used

- **Frontend**:
  - React
  - Vite
  - Redux
  - Typescript
  - Tailwind CSS
  - Lucide React (for icons)

- **Backend**:
  - Node.js
  - Express
  - Blackbox.ai API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn or npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/seek-server.git
   git clone https://github.com/yourusername/seek-client.git
   ```

2. **Install dependencies for the client:**
   ```bash
   cd seek-client
   yarn install
   ```

3. **Install dependencies for the server:**
   ```bash
   cd seek-server
   yarn install
   yarn build
   ```

4. **Create a `.env` file in both the client and server directories** and add your configuration values. You may need to include the following variables:

   - For the **server**:
     ```env
     BLACKBOX_API_KEY=your_blackbox_ai_api_key
     ```

   - For the **client**:
     ```env
     VITE_API_URL=http://localhost:3000/api
     ```

### Running the Application

1. **Start the server:**
   ```bash
   cd seek-server
   yarn nodemon
   ```

2. **Start the client:**
   ```bash
   cd seek-client
   yarn dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173` to access the application.

## Deployment

The application has been deployed on Vercel. You can access it [here](https://seek-code.vercel.app).

## API Endpoints

- `POST /api` - Accepts a prompt and returns the generated code from Blackbox.ai.
- `POST /api/continue` - Accepts a prompt and previously generated code to continue the generation.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to Blackbox.ai for providing the API used in this project.