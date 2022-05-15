import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import segheriaDataServices from "../services/Services2";
import Button from "./Button";
import "./Button.css";
import Counter2 from "./Counter2";

export default function Location({
  name,
  getRoute2Id,
  id2,
  toggle,
  setToggle,
}) {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Segheria"), (snaphot) => {
      if (snaphot) {
        setRoutes(
          snaphot.docs.map((el) => {
            return { ...el.data(), id: el.id };
          })
        );
      } else {
        setError("it wasn't possible to fetch data");
      }
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    await segheriaDataServices.deleteRoute(id);
  };

  const stelle = function (numb) {
    let output = "⭐";
    for (let i = 0; i < numb; i++) {
      output = output + "⭐";
    }
    return output;
  };

  const handleClick = (id) => {
    getRoute2Id(id);
    setToggle(!toggle);
  };

  return (
    <div className="center">
      <h3>{name}</h3>
      {error && <p>{error}</p>}

      <table className="padding__table container">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Grado</th>
            <th>Bellezza</th>
            <th>Action</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((el, idx) => {
            return (
              <tr key={el.id}>
                <td>{idx + 1}</td>
                <td>{el.nome}</td>
                <td>{el.grado}</td>
                <td>{stelle(el.bellezza)}</td>
                <td className="row">
                  <Button
                    text={"delete"}
                    handleClick={() => handleDelete(el.id)}
                    style={"btn-delete btn"}
                  />
                  <Button
                    text={"edit"}
                    handleClick={() => handleClick(el.id)}
                    style={"btn-edit btn"}
                  />
                  <p className="icon" onClick={() => getRoute2Id(el.id)}>
                    👍
                  </p>
                </td>
                <td>
                  <Counter2 text={el.likes} id2={id2} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
/* <ul>
        {routes.map((el, idx) => {
          return (
            <li key={idx} className="row">
              <Route name={el.nome} grado={el.grado} bellezza={el.bellezza} />
              <Button text={"delete"} handleClick={() => handleDelete(el.id)} />
              <Button text={"edit"} handleClick={() => getRoute2Id(el.id)} />
            </li>
          );
        })}
      </ul>*/
