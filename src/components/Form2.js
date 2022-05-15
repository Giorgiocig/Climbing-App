import React, { useEffect, useState } from "react";
import Button from "./Button";
import segheriaDataServices from "../services/Services2";
import "./Form.css";

export default function Form({ id2, setRouteId2 }) {
  const [form, setForm] = useState({
    nome: "",
    grado: "",
    bellezza: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (form.nome === "" || form.grado === "" || form.bellezza === "") {
      setMessage("You need to fill every field");
      return;
    }
    const newRoute = {
      nome: form.nome,
      grado: form.grado,
      bellezza: form.bellezza,
    };
    try {
      if (id2 !== undefined && id2 !== "") {
        await segheriaDataServices.updateRoute(id2, newRoute);
        setRouteId2("");
        setMessage("route inserted correctly");
      } else {
        await segheriaDataServices.addRoute(newRoute);
        setMessage("route inserted correctly");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const editHandler = async () => {
    try {
      const docSnap = await segheriaDataServices.getRoute(id2);
      console.log(id2);
      setForm({
        nome: docSnap.data().nome,
        grado: docSnap.data().grado,
        bellezza: docSnap.data().bellezza,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (id2 !== undefined && id2 !== "") {
      editHandler();
    }
  }, [id2]);

  //LIKES

  return (
    <div>
      <h3>Inserisci/modifica una via</h3>
      <form onSubmit={handleSubmit}>
        <div className="col container__form">
          <label>nome via</label>
          <input
            type="text"
            onChange={handleChange}
            name="nome"
            value={form.nome}
          />
        </div>
        <div className="col container__form">
          <label>grado</label>
          <input
            type="text"
            onChange={handleChange}
            name="grado"
            value={form.grado}
          />
        </div>
        <div className="col container__form">
          <label>bellezza</label>
          <input
            type="text"
            onChange={handleChange}
            name="bellezza"
            value={form.bellezza}
          />
        </div>

        <Button text={"AGGIUNGI/MODIFICA"} style={"btn btn-form"} />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
