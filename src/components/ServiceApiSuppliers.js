import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global';
export default class ServiceApiSuppliers extends Component {
    //Hacemos referencia con el input del id para coger este dato para usarlo para el find
    cajaid=React.createRef();
    state={
        suppliers:[],//donde van a estar todos los proveedores
        supplier:[]
    }
    
    url=Global.urlNorthwind;
    //CARGAMOS LOS PROVEEDORES Y LUEGO USAMOS COMPONENT DIDMOUNT
    loadSuppliers=()=>{
        let request ="Suppliers"
        console.log("Antes del servicio")
        axios.get(this.url+request).then(response=>{
            console.log("Leyendo servicio")
            console.log(response.data.value)//dentro de response data se encuentran los datos,por eso hay que revisar
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
    //FUNCIÓN PARA MOSTRAR EL PROVEEDOR CON EL ID RECOGIDO
    mostrarSelect=(event)=>{
        event.preventDefault();
        let idsupplier=parseInt(this.cajaid.current.value);
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
