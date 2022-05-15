import React, { useEffect, useState } from "react";
import Button from "./Button";
import scaletteDataServices from "../services/Services";
import "./Form.css";
import "./Button.css";

export default function Form({ id1, setRouteId1 }) {
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
      if (id1 !== undefined && id1 !== "") {
        await scaletteDataServices.updateRoute(id1, newRoute);
        setRouteId1("");
        setMessage("route inserted correctly, click on refresh to refresh");
      } else {
        await scaletteDataServices.addRoute(newRoute);
        setMessage("route inserted correctly");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const editHandler = async () => {
    try {
      const docSnap = await scaletteDataServices.getRoute(id1);
      console.log(docSnap.data().nome);
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
    if (id1 !== undefined && id1 !== "") {
      editHandler();
    }
  }, [id1]);

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
