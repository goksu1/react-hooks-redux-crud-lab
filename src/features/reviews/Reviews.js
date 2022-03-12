import React from "react";
import Review from "./Review";

function Reviews({ reviews }) {
  return (
    <ul>
      {reviews.map((rev) => (
        <Review key={rev.id} review={rev} />
      ))}
      <hr/>
    </ul>

  );
}

export default Reviews;
