"use client";
import { context } from "../../../userContext";
import React, { useState } from "react";

export default function AuthContext(props) {
  const [userContext, setUserContext] = useState({});
  //FALTA OBTENER LOS DATOS DEL JWT Y PASARLOS A setUserContext POR SI RECARGA LA WEB
  return (
    <context.Provider value={{ userContext, setUserContext }}>
      {props.children}
    </context.Provider>
  );
}
