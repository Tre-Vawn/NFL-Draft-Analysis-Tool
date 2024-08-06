import React from "react";
import "./App.css";
import Players from "./components/Players";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NFL Draft Analysis Tool</h1>
      </header>
      <main>
        <Players/>
      </main>
      <footer>
        <p>&copy; 2024 NFL Draft Analysis Tool</p>
      </footer>
    </div>
  );
}

export default App;
