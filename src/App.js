// import { render } from "@testing-library/react";
import React from "react";

// Styles
import "./App.css";

// components
import OmdbApi from "./components/omdb-api/OmdbApi";
// import ImdbApi from "./components/imdb-api/ImdbApi";
import Episodic from "./components/eipsodic/Episodic";

function App() {
  return (
    <div className="App">
      <OmdbApi />
      {/* <ImdbApi /> */}
      {/* <Episodic /> */}
    </div>
  );
}

export default App;
