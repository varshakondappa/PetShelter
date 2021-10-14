const PetsController = require("../controllers/pets.controllers");
module.exports = (app) => {
  app.post("/api/pets", PetsController.addNewPet);
  app.get("/api/pets", PetsController.getAllPets);
  app.get("/api/pets/:id", PetsController.getPetById);
  app.put("/api/pets/:id", PetsController.updatePetById);
  app.delete("/api/pets/:id", PetsController.deletePetById);
};
