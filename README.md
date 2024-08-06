# NFL Draft Analysis Tool

[![Node.js CI](https://github.com/Tre-Vawn/NFL-Draft-Analysis-Tool/actions/workflows/node.js.yml/badge.svg)](https://github.com/Tre-Vawn/NFL-Draft-Analysis-Tool/actions/workflows/node.js.yml)

## Introduction

The NFL Draft Analysis Tool is designed to provide detailed information about the 2024 NFL draft prospects. Users can search for and view player information, including height, weight, and team information.

## File Structure

### Backend

- `backend/db.js`: MongoDB connection setup.
- `backend/models/Player.js`: Mongoose schema for player data.
- `backend/controllers/playerController.js`: Functions for fetching player data from the API and interacting with the MongoDB database.
- `backend/routes/players.js`: Routes for player-related API endpoints.
- `backend/server.js`: Express server setup and route configurations.

### Frontend

- `frontend/src/App.js`: Main React component, sets up routes.
- `frontend/src/components/Players.js`: Component for displaying and searching player information.
- `frontend/src/services/api.js`: Functions for making API requests to the backend.

## Features

- Fetch player data from the SportsDataIO API.
- Store Player data in a MongoDB database.
- Display player data in a user-friendly React interface.
- Search player information.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Tre-Vawn/NFL-Draft-Analysis-Tool.git
    ```

2. Navigate to the project directory:

    ```sh
    cd NFL-Draft-Analysis-Tool
    ```

3. Install backend dependencies:

    ```sh
    cd backend
    npm install
    ```

4. Start MongoDB and ensure it is running and accessible:

    - If you have MongoDB installed locally, you can start it with:

    ```sh
    mongod
    ```

    - Make sure you have MongoDB installed and running on your machine or have access to a MongoDB instance.
    - Update the MongoDB connection string in `backend/db.js` if necessary.

5. Configure environment variables:

    - Create a `.env` file in the backend direction with the following content:

    ```sh
    API_KEY=your_sportsdata_api_key
    MONGO_URI=your_mongodb_connection_string
    ```

    - Replace your_sportsdata_api_key with your actual API key from SportsDataIO.
    - Replace your_mongodb_connection_string with your MongoDB connection string.

6. Start backend server:

    ```sh
    cd backend
    npm start
    ```

7. Install frontend dependencies:

    ```sh
    cd backend
    npm start
    ```

8. Start frontend development server:

    ```sh
    cd ../frontend
    npm install

9. Open browser and navigate to local host specified, typically `http://localhost:3000`.

## Usage

1. Open the application in your browser.
2. Use the search bar to find players by name.
3. View detailed player information.


## Contact Information

For questions or suggestions, please contact <trevawn.rainey@gmail.com>.
