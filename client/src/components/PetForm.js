import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import io from "socket.io-client";

const PetForm = (e) => {
  const [name, setName] = useState("");
  const [petType, setPetType] = useState("");
  const [description, setDescription] = useState("");
  const [skill_1, setSkill_1] = useState("");
  const [skill_2, setSkill_2] = useState("");
  const [skill_3, setSkill_3] = useState("");
  const [errors, setErrors] = useState({});
  const [socket] = useState(() => io(":8000"));

  const submitHandler = (e) => {
    e.preventDefault();
    const newPet = {
      name,
      petType,
      description,
      skill_1,
      skill_2,
      skill_3,
    };
    axios
      .post("http://localhost:8000/api/pets", newPet)
      .then((res) => {
        console.log(res);
        socket.emit("added_pet", res.data);
        socket.disconnect();
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <h1>Pet Shelter</h1>
      <p>Know a pet needing a home?</p>{" "}
      <div className="d">
        <Link to="/">back to home</Link>
      </div>
      <div className="row-1">
        <div className="col-6 col-form-styling">
          <form onSubmit={submitHandler}>
            <div>
              <label className="form-label">Pet Name:</label>
              <br></br>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {errors && errors.name && (
                <p className="error-text">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="form-label">Pet Type:</label>
              <br></br>
              <input
                type="text"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
              />
              {errors && errors.petType && (
                <p className="error-text">{errors.petType.message}</p>
              )}
            </div>
            <div>
              <label className="form-label">Description:</label>
              <br></br>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors && errors.description && (
                <p className="error-text">{errors.description.message}</p>
              )}
            </div>{" "}
            <br />
            <div>
              <label>Skills (optional):</label>
            </div>{" "}
            <div>
              <label className="form-label">Skill 1:</label>
              <br></br>
              <input
                type="text"
                value={skill_1}
                onChange={(e) => setSkill_1(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Skill 2:</label>
              <br></br>
              <input
                type="text"
                value={skill_2}
                onChange={(e) => setSkill_2(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Skill 3:</label>
              <br></br>
              <input
                type="text"
                value={skill_3}
                onChange={(e) => setSkill_3(e.target.value)}
              />
            </div>{" "}
            <br />
            <div>
              <button className="btn btn-primary" type="submit">
                Add Pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PetForm;
