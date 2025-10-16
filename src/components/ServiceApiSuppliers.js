import React, { Component } from 'react'
import axios from 'axios'

export default class ServiceApiSuppliers extends Component {

    cajaid=React.createRef();
    state={
        suppliers:[],
        supplier:[]
    }

    url="https://services.odata.org/V4/Northwind/Northwind.svc/Suppliers"

    loadSuppliers=()=>{
        console.log("Antes del servicio")
        axios.get(this.url).then(response=>{
            console.log("Leyendo servicio")
            console.log(response.data.value)
            this.setState({
                suppliers:response.data.value
            })
        })
        console.log("Después del servicio")
    }
    componentDidMount=()=>{
        console.log("Creando componente")
        this.loadSuppliers();
    }

    mostrarSelect=(event)=>{
        event.preventDefault();
        let idsupplier=this.cajaid.current.value;
        console.log(idsupplier)
        //buscar en el array de suppliers el id que nos han pasado
        let supplierEncontrado=this.state.suppliers.find(supplier=>supplier.SupplierID==idsupplier)
        console.log(supplierEncontrado)
        this.setState({
            supplier:supplierEncontrado
        })
         
    }

  render() {
    return (
      <div>
        <h1>Servicio API Suppliers</h1>
        <ul>
        {
            this.state.suppliers.map((supplier,index)=>{
                return(<li key={index}>{supplier.SupplierID} {supplier.ContactName}</li>)
            })
        }
        </ul>

        <form onSubmit={this.mostrarSelect}>
            <h2>Buscar por id</h2>
            <label>Id: </label>
            <input type="number" ref={this.cajaid}/>
            <button >Buscar id</button>
        </form>

        {/* LLAMAMOS AL ARRAY */}
        <h1>Nombre de la empresa: {this.state.supplier.CompanyName}</h1>
        <h2 style={{color:"gold"}}>Nombre: {this.state.supplier.ContactName}</h2>
        <h3>Puesto: {this.state.supplier.ContactTitle}</h3>
      </div>
    )
  }
}
