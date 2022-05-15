import React from "react";
import image1 from "../images/DSCF8181.jpg";
import image2 from "../images/image2.jpg";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Header() {
  let navigate = useNavigate();
  return (
    <div>
      <h2 className="center">Clicca su un'immagine per visualizzare le vie</h2>
      <div className="row flex-sb align-center ">
        <div className="card">
          <div className="img__container">
            <img
              src={image1}
              className="card__image"
              onClick={() => navigate("/LeScalette")}
              alt="man doing climbing "
            />
          </div>

          <p className="card__text">Le Scalette</p>
        </div>

        <div className="card">
          <div className="img__container">
            <img
              src={image2}
              className="card__image"
              onClick={() => navigate("/LaSegheria")}
              alt="man doing climbing"
            />
          </div>
          <p className="card__text">La Segheria</p>
        </div>
      </div>
    </div>
  );
}
