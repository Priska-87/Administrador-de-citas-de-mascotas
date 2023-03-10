import { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {
 
    // Crear state de citas

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha:'',
        hora:'',
        sintomas: ''

    })

    const [error, actualizarError] = useState(false)

    

    // Función actualizar state
    const actualizarState = e => {
        actualizarCita({ ...cita, [e.target.name]: e.target.value })
        }   

        // Extraer los valores
        const {mascota, propietario, fecha, hora, sintomas} = cita

        // Enviar formulario
        const submitCita = e => {
            e.preventDefault();

            

        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
        hora.trim() === '' || sintomas.trim() === '' ) {
            actualizarError(true)
            return;
        }
        
        // Eliminar mensaje de alerta si todos los campos estan completos
        actualizarError(false)


        // Asignar un ID (key)
        cita.id= uuidv4()
        

        // Crear la cita, agregarla al state principal
        crearCita(cita)

        // Reiniciar el formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha:'',
            hora:'',
            sintomas: ''
        })

        }

    return (  
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            
            <form
            onSubmit={submitCita}
            >
                <label>Nombre Mascota ♥</label>
                <input type="text"
                       name="mascota"
                       className="u-full-width"
                       placeholder="Nombre de tu mascota"
                       onChange={actualizarState}
                       value={mascota}
                />

                <label>Nombre dueño/a</label>
                <input type="text"
                       name="propietario"
                       className="u-full-width"
                       placeholder="Escribe tu nombre"
                       onChange={actualizarState}
                       value={propietario}
                />

                <label>Fecha de la cita</label>
                <input type="date"
                       name="fecha"
                       className="u-full-width"
                       onChange={actualizarState}
                       value={fecha}
                       
                />

                <label>Hora de la cita</label>
                <input type="time"
                       name="hora"
                       className="u-full-width"
                       onChange={actualizarState}
                       value={hora}
                       
                />
                <label>Motivo de la cita</label>
                <textarea
                className="u-full-width"
                name="sintomas"
                placeholder="Escribe el motivo o los síntomas de tu máscota"
                onChange={actualizarState}
                value={sintomas}
                >
                </textarea>

                <button
                type="submit"
                className="u-full-width boton-agregar"
                >Agregar cita</button>
                
            </form>
        </Fragment>
    );
}


Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
  }
 
export default Formulario;