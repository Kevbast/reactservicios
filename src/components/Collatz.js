import React, { Component } from 'react'

export default class Collatz extends Component {
    
    state={
        numeros:[]//creamos una lista de numeros,puesto que va a cambiar
    }

    generarCollatz =()=>{
        let aux=[]//declaramos una variable auxiliar
        let numero= parseInt(this.props.numero)
        console.log(numero)
        while(numero!=1){
            if(numero%2==0){//si es par 
                numero = numero / 2;
            }else{
                numero=numero*3 +1;
            }
            aux.push(numero);
        }
        //Pasamos el aux cada vez que cambie    
        this.setState({
            numeros:aux
        })

    }
    componentDidMount=()=>{
        this.generarCollatz();
    }
    

  render() {
    return (
      <div>
        <h1>Conjetura Collatz {this.props.numero}</h1>
            <ul>
                {
                    this.state.numeros.map((num,index)=>{
                        return(<li key={index}>{num}</li>)
                    })
                }
            </ul>

      </div>
    )
  }
}
