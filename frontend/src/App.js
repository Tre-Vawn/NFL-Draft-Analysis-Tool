import React from "react";
import Players from "./components/Players";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NFL Draft Analysis Tool</h1>
      </header>
      <main>
        <Players />
      </main>
    </div>
  );
}

export default App;
