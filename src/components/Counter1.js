import React, { useEffect } from "react";
import scaletteDataServices from "../services/Services";

export default function Counter1({ text, id1 }) {
  const likeHandler = async () => {
    try {
      const docSnap = await scaletteDataServices.getRoute(id1);
      const likes = { likes: docSnap.data().likes + 1 };
      scaletteDataServices.updateRoute(id1, likes);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    likeHandler();
  }, [id1]);
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
