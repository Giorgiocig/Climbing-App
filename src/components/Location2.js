import React, { useState } from "react";
import Form2 from "./Form2";
import Location2List from "./Location2List";
import { useToggle } from "../hooks/useToggle";

export default function Location2() {
  const [routeId2, setRouteId2] = useState("");
  const [toggle, setToggle] = useToggle(false);

  const getRoute2Handler = (id2) => {
    setRouteId2(id2);
  };

  console.log(toggle);

  return (
    <div>
      <Location2List
        name={"La Segheria"}
        getRoute2Id={getRoute2Handler}
        className="location"
        id2={routeId2}
        toggle={toggle}
        setToggle={setToggle}
      />
      {toggle && <Form2 id2={routeId2} setRouteId2={setRouteId2} />}
    </div>
  );
}
