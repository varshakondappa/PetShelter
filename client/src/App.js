import React from "react";
// import ProductForm from "./components/ProductForm";
import "./App.css";
import PetForm from "./components/PetForm";
import DisplayPets from "./components/DisplayPets";
import Update from "./components/Update";
import Details from "./components/Details";

import { Router } from "@reach/router";

function App() {
  return (
    <div className="App">
      <Router>
        <DisplayPets path="/" />
        <PetForm path="/pets/new" />
        <Update path="/pets/:id/edit" />
        <Details path="/pets/:id"></Details>
      </Router>
    </div>
  );
}

export default App;
