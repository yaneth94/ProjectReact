import React, { Component } from 'react';
import Header from './components/Header';
import './bootstrap.min.css';
import NuevaCita from './components/nuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends Component {
  state ={
    citas: []
  }
  // Cuando la aplicación carga
  componentDidMount(){
    const citasLS = localStorage.getItem('citas');
    if(citasLS){
      this.setState({
        citas: JSON.parse(citasLS)
      })
    }
  }
  //Cuando eliminamos o agregamos una nueva cita
  componentDidUpdate(){
    localStorage.setItem('citas',JSON.stringify(this.state.citas));
  }

  crearNuevaCita = datos => {
    //copiar el state actual
    const citas = [...this.state.citas,datos];

    //agregar el nuevo state
    this.setState({
      citas
    })
  }
  //elimina las citas del state
  eliminarCita = id =>{
    //tomar una copia del state
    //siempre debe crear una copia porque es mutable
    const citasActuales =[...this.state.citas];

    //utilizar filter para sacar el elemento @id del arreglo
    //filter es para tomar exactamente pero elimina el que es exacto por eso le pone diferente
    const citas = citasActuales.filter(cita => cita.id !== id)
    //actualizar el state
    this.setState({
      citas
    })
  }
  render() {
    return (
      <div className="container">
        <Header
          titulo='Administrador Pacientes Veterinaria'>
        </Header>
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita
              crearNuevaCita={this.crearNuevaCita}>
            </NuevaCita>
          </div>

          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas
              citas={this.state.citas}
              eliminarCita = {this.eliminarCita}
            ></ListaCitas>
          </div>
        </div>
      </div>
    );
  }
}

export default App;