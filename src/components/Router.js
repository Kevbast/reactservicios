import React, { Component } from 'react'
//para la navegación
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Home'
import TabladeMultiplicar from './TabladeMultiplicar'
import NotFound from './NotFound'
import { useParams } from 'react-router-dom'// puede estar en la linea 2
import Collatz from './Collatz'
import Cursos from './ejemplocomunicacion/Cursos'
import MenuRutas from './MenuRutas'
export default class Router extends Component {
  render() {

    function TablaMultiplicarElement(){
        //ESTA FUNCION NOS SETVIRA PARA CAPTURAR LOS PARÁMETROS
        //RECIBIDOS EN UNA RUTA Y ENVIARLOS CON PROPS A NUETSRO COMPONENT
        //VAMOS A ENVIAR UN PARÁMETRO LLAMADI minumero
        let {minumero} = useParams();
        //DEVOLVEMOS EL COMPONENT TABLAMULTIPLICAR CON SUS PROPS
        return <TabladeMultiplicar numero={minumero}/>
    }

    function CollatzElement(){
        let {minumero}=useParams();
        return <Collatz numero={minumero}/>
    }

    return (
      <BrowserRouter>
      <MenuRutas/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cursos' element={<Cursos/>}/>
            <Route path='/tabla/:minumero' element={<TablaMultiplicarElement/>}/>
            <Route path='/collatz/:minumero' element={<CollatzElement/>}/>
            {/* PARA INCLUIR LAS RUTAS QUE NO EXISTEN CON UNA PÁGINA 404 PERSONALIZADA DEBEMOS UTILIZAR EL * 
            Y SIEMPRE DEBE SER LA ÚLTIMA RUTA */}
            <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}