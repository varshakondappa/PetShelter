const Pets = require("../models/pets.models");
// const createProduct = (req, res) => {
//   Product.create(req.body)
//     .then((newProduct) => res.json(newProduct))
//     .catch((err) => console.log(err));
// };

module.exports.addNewPet = (request, response) => {
  const { name, petType, description, skill_1, skill_2, skill_3 } =
    request.body;
  Pets.create({
    name,
    petType,
    description,
    skill_1,
    skill_2,
    skill_3,
  })
    .then((pet) => response.json(pet))
    .catch((err) => response.status(400).json(err));
};

module.exports.getAllPets = (req, res) => {
  Pets.find({})
    .then((allPets) => res.json(allPets))
    .catch((err) => res.status(400).json(err));
};
module.exports.getPetById = (req, res) => {
  Pets.findOne({ _id: req.params.id })
    .then((petId) => res.json(petId))
    .catch((err) => res.status(400).json(err));
};
module.exports.updatePetById = (req, res) => {
  Pets.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatePet) => res.json(updatePet))
    .catch((err) => res.status(400).json(err));
};
module.exports.deletePetById = (req, res) => {
  Pets.deleteOne({ _id: req.params.id })
    .then((deletePet) => res.json(deletePet))
    .catch((err) =>
      res.status(400).json({ message: "Something went wrong", err: err })
    );
};
