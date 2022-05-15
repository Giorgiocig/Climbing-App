import React, { useEffect } from "react";
import segheriaDataServices from "../services/Services2";

export default function Counter2({ text, id2 }) {
  const likeHandler = async () => {
    try {
      const docSnap = await segheriaDataServices.getRoute(id2);
      const likes = { likes: docSnap.data().likes + 1 };
      segheriaDataServices.updateRoute(id2, likes);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    likeHandler();
  }, [id2]);
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
