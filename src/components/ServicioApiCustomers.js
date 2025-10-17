import React, { Component } from 'react'
//traemos axios
import axios from 'axios'
import Global from '../Global'//PARA LAS URL GLOBALES
export default class ServicioApiCustomers extends Component {
    //creamos una variable,no puede ser en state,ya que solo llega una vez al cargar los datos
    //EL DIBUJO NO ES INMEDIATO,PUESTO Q NO SABEMOS CUANTO VA A TARDAR EN LLEGAR LOS DATOS
    state={
        customers:[]
    }

    url="https://services.odata.org/V4/Northwind/Northwind.svc/Customers"
    //CREAMOS UN MÉTODO PARA CARGAR LOS CLIENTES
    loadCustomers=()=>{
        console.log("Antes del servicio")
        axios.get(this.url).then(response=>{
            console.log("Leyendo servicio");
            //La información viene en response.data
            console.log(response.data);
            console.log(response.data.value);
            this.setState({
                customers:response.data.value
            })
        })

        console.log("Después del servicio")
    }

    //importante!!
    componentDidMount=()=>{
        console.log("Creando Component");
        this.loadCustomers();
    }

  render() {
    return (
      <div>
        <h1>Servicio Api Customers</h1>
        <button >
            Load Customers
        </button>
        {
            this.state.customers.map((cliente,index)=>{
                // mirar bien el nombre
                return(<h3  key={index} style={{color:"blue"}}>{cliente.ContactName}</h3>)
            })
        }
      </div>
    )
  }
}
