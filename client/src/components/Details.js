import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";
const Details = (props) => {
  const [pet, setPet] = useState({});
  const [like, setLike] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets/" + props.id)
      .then((res) => setPet({ ...res.data }))
      .catch((err) => console.log(err));
  });
  const handleEnable = (e) => {
    setLike(1);
    e.target.disabled = true;
  };
  return (
    <>
      <h1>Pet Shelter</h1>
      <h4>Details about: {pet.name}</h4>
      <div className="c">
        <Link to="/">back to home</Link>
      </div>

      <div className="details">
        <div className="in-details">
          <h5>Pet Type : {pet.petType}</h5>
          <br />
          <h5>Description : {pet.description}</h5>
          <br />
          <h5>Skill 1 : {pet.skill_1}</h5>
          <br />
          <h5>Skill 2 : {pet.skill_2}</h5>
          <br />
          <h5>Skill 3 : {pet.skill_3}</h5>
          <br />
        </div>
        <br />
        <button
          className="btn btn-success"
          onClick={handleEnable}
          type="button"
        >
          {" "}
          Like {pet.name}
        </button>
        <span> {like} like(s)</span>
      </div>
    </>
  );
};
export default Details;
