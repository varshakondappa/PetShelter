const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const PetsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pet Name is required"],
      minLength: [3, "Pet Name must be atleast 3 characters"],
      unique: [true, "Must be Unique name"],
    },
    petType: {
      type: String,
      required: [true, "Pet Type is required"],
      minLength: [3, "Pet Type must be atleast 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Pet Description is required"],
      minLength: [3, "Pet  Description must be atleast 5 characters"],
    },
    skill_1: {
      type: String,
    },
    skill_2: {
      type: String,
    },
    skill_3: {
      type: String,
    },
  },
  { timestamps: true }
);
// PetsSchema.plugin(uniqueValidator);
PetsSchema.path("name").validate(async (name) => {
  const nameCount = await mongoose.models.Pets.countDocuments({ name });
  return !nameCount;
}, "Name already exists unique name required");

module.exports = mongoose.model("Pets", PetsSchema);
