import React, { Component } from 'react'

export default class TabladeMultiplicar extends Component {
    state ={
        tabla:[]
    }

    generarTablaMultiplicar=()=>{
        let aux =[];

        let numero= parseInt(this.props.numero)

        for (let i = 1; i <=10; i++) {
            var results = numero*i;
            aux.push(results);
        }

        this.setState({
            tabla:aux
        })
    }

    componentDidMount=()=>{
        this.generarTablaMultiplicar();
    }
    
  render() {
    return (
      <div>
        <h1>Tabla de Multiplicar Rutas</h1>
        <h3 style={{color:"blueviolet"}}>Número{this.props.numero}</h3>

        <ul>
            {
                this.state.tabla.map((num,index)=>{
                    return(<li key={index}>{num}</li>)
                })
            }
        </ul>
      </div>
    )
  }
}
