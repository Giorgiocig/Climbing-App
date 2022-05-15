import React, { useState } from "react";
import Form1 from "./Form1";
import Location1List from "./Location1List";
import { useToggle } from "../hooks/useToggle";

export default function Location1() {
  const [routeId1, setRouteId1] = useState("");
  const [toggle, setToggle] = useToggle(false);

  const getRoute1Handler = (id) => {
    setRouteId1(id);
  };

  return (
    <div className="location">
      <Location1List
        name={"Le Scalette"}
        getRoute1Id={getRoute1Handler}
        id1={routeId1}
        toggle={toggle}
        setToggle={setToggle}
      />
      {toggle && <Form1 id1={routeId1} setRouteId1={setRouteId1} />}
    </div>
  );
}
