import { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

 

function App() {

// Citas en local storage
let citasIniciales = JSON.parse(localStorage.getItem('citas'));
if(!citasIniciales){
  citasIniciales = [];
}

// Arreglo de todas las citas 
const [citas, guardarCitas] = useState(citasIniciales);

// UseEffect para realizar ciertas operaciones cuando el state cambia
useEffect( () => {
  if(citasIniciales){
    localStorage.setItem('citas', JSON.stringify(citas));
  } else {
    localStorage.setItem('citas', JSON.stringify([]));
  }
  
}, [citas, citasIniciales])

// Función que agrega la cita nueva al array de citas (a la copia de las citas)
const crearCita = cita => {
  guardarCitas([...citas, cita])
}

// Función que elimina cita por su ID
const eliminarCita = id => {
  const nuevasCitas = citas.filter(cita => cita.id !== id);
  guardarCitas(nuevasCitas);
}

// Mensaje condicional
const titulo = citas.length === 0 ? 'No hay citas ingresadas' : 'Administra tus citas' 


  return (
    <Fragment>
    <h1>{titulo}</h1>

    <div className="container">
     <div className="row">
      <div className="one-half column">
        <Formulario
        crearCita = {crearCita}
        />
      </div>
      <div className="one-half column">
      <h2>Tu cita creada</h2>
      {citas.map(cita => (
        <Cita 
        key = {cita.id}
        cita = {cita}
        eliminarCita = {eliminarCita}
        />
      ))}
      </div>
      
     </div>
    </div>
    </Fragment>
  );
}

export default App;
