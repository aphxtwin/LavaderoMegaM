'use client'

import React, { useState } from 'react';
import axios from 'axios';


const Formulario = () => {
  const [formVisible, setFormVisible] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name: event.target.elements.nombre.value,
      id_number: event.target.elements.documento.value,
      address: event.target.elements.domicilio.value,
      phone_number: event.target.elements.telefono.value,
      IVA_condition: event.target.elements.condicionIva.value,
      email: event.target.elements.correoElectronico.value
    };

    const res = await fetch("/api/cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: formData.name, id_number: formData.id_number, email: formData.email , phone: formData.phone_number, condIVA: formData.IVA_condition, domicilio: formData.address})
    });

    console.log(res.ok)
    
  };

  return(
    <div>
      <button onClick={() => {
        setFormVisible(true);
      }}>Cargar cliente</button>
      {formVisible && (
        <form className="formulario" onSubmit={handleFormSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" />
          <input type="number" name="documento" placeholder="Documento" />
          <input type="text" name="domicilio" placeholder="Domicilio" />
          <input type="number" name="telefono" placeholder="Teléfono" />
          <select name="condicionIva">
            <option value="Consumidor Final">Consumidor Final</option>
            <option value="Monotributista">Monotributista</option>
            <option value="Responsable inscripto">Responsable inscripto</option>
          </select>
          <input type="email" name="correoElectronico" placeholder="Correo electrónico" />
          <button type="submit">Enviar formulario</button>
        </form>
      )}
    </div>
  );
};


export default function Dashboard() {

  return(
    <div className="dashboard">
      <Formulario/>
    </div>
  );
};

