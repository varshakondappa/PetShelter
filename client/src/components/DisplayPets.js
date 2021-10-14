import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import io from "socket.io-client";

const DisplayPets = (props) => {
  const [pets, setPets] = useState([]);
  const [socket] = useState(() => io(":8000"));
  useEffect(() => {
    console.log("Inside of UseEffect for sockets");
    socket.on("connect", () => {
      console.log("We're connected with the server", socket.id);
    });

    socket.on("pet_added", (data) => {
      console.log(data);
      console.log("Current all pets state", pets);
      setPets((currentPetsvalue) => {
        console.log("Inside set all heroes", currentPetsvalue);
        return [data, ...currentPetsvalue];
      });
    });
    socket.on("pet_deleted", (data) => {
      setPets((currentListOfPets) => {
        // const petsCopy = [...pets];
        let filterArr = currentListOfPets.filter((element, idx) => {
          return idx !== data;
        });
        return filterArr;
      });
    });

    return () => socket.disconnect();
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then((res) => {
        setPets(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleAdopt = (id, index) => {
    console.log("handle adopt", id);
    axios
      .delete(`http://localhost:8000/api/pets/${id}`)
      .then((response) => {
        console.log(response);
        socket.emit("deleted_pet", index);
        socket.disconnect();
        const petsCopy = [...pets];
        const filterArr = petsCopy.filter((element, idx) => {
          return idx !== index;
        });
        setPets(filterArr);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <h1>Pet Shelter</h1>
        <p>These pets are looking for a good home</p>
        <div className="a">
          <Link to="/pets/new">Add a pet to the shelter</Link>
        </div>
        <div className="row">
          <div className="col-10">
            <table className="table">
              <thead>
                <tr>
                  {" "}
                  <th>Name</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pets
                  .sort((a, b) => a.petType.localeCompare(b.petType))
                  .map((element, index) => (
                    <tr key={index}>
                      <td>{element.name}</td>
                      <td>{element.petType}</td>
                      <td>
                        <Link to={`/pets/${element._id}`}>Details </Link>
                        <span> | </span>
                        <Link to={`/pets/${element._id}/edit`}>edit</Link>
                        <button
                          onClick={() => handleAdopt(element._id, index)}
                          type="button"
                          className="btn btn-danger"
                        >
                          ADOPT
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayPets;
