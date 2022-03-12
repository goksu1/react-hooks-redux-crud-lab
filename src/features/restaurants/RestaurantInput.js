import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { restaurantAdded } from "./restaurantsSlice";

function RestaurantInput() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleInputChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(restaurantAdded(name));
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{marginRight:10}}>
        Name :
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Add Restaurant</button>
    </form>
  );
}

export default RestaurantInput;
