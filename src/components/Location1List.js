import React, { useState, useEffect } from "react";
import scaletteDataServices from "../services/Services";
import Button from "./Button";
import Counter1 from "./Counter1";

export default function Location({
  name,
  getRoute1Id,
  id1,
  toggle,
  setToggle,
}) {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState("");

  //READ ROUTES
  const getRoutes = async () => {
    try {
      const data = await scaletteDataServices.getAllRoutes();
      setRoutes(
        data.docs.map((el) => {
          return { ...el.data(), id: el.id };
        })
      );
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getRoutes();
    if (routes) {
      setError(null);
    } else {
      setError("it wasn't possible to fetch data");
    }
  }, []);

  //delete
  const handleDelete = async (id) => {
    await scaletteDataServices.deleteRoute(id);
    getRoutes();
  };

  //STARS
  const displayStars = function (numb) {
    let output = "⭐";
    for (let i = 0; i < numb; i++) {
      output = output + "⭐";
    }
    return output;
  };

  const handleClick = (id) => {
    getRoute1Id(id);
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
            <th>Action </th>
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
                <td style={{ color: "red" }}>{displayStars(el.bellezza)}</td>
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
                  <p className="icon" onClick={() => getRoute1Id(el.id)}>
                    👍
                  </p>
                </td>
                <td>
                  <Counter1 text={el.likes} id1={id1} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        text={"refresh"}
        handleClick={() => getRoutes()}
        style={"btn btn-refresh"}
      />
    </div>
  );
}

/*routes &&
          routes.map((el, idx) => {
            return (
              <li key={idx} className="row">
                <Route name={el.nome} grado={el.grado} bellezza={el.bellezza} />
                <Button
                  text={"delete"}
                  handleClick={() => handleDelete(el.id)}
                />
                <Button text={"edit"} handleClick={() => getRoute1Id(el.id)} />
              </li>
            );
          })*/
