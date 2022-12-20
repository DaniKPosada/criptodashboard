import React from 'react';
import './Header.css'; //Estilos
import { useTheme } from './Context/ThemeProvider'; //Dark mode

export default function Header({currencys, fun, cur}){ //props del componente para su lógica de funcionamiento
  // currency = Estado de moneda
  // fun = Redondea los datos
  // cur = Moneda/Valor
  const {theme, toggleTheme} = useTheme();
  
  return ( //Estructura del header
    <header className='app-header'>
      <p>Crypto Stadistics</p>
      <div className='select-button'>
      {/*----------------Activa las funciones en el selector----------------*/}
      {/* utilizamos los valores llamados desde App.js para algunos atrubutos y valores en la etiqueta select */}
      {/* se crea una función flecha con "fun" dentro que toma un valor cur y lo aplica dentro de un id coiSelect */}
      <select value={cur} name="coinSelect" id="coinSelect" onChange={() => {fun(document.getElementById("coinSelect").value)}}>
        {/* al valor actal lo recorremos con un .map creando uno o varios array con los mismos valores teniendo presente los parametros item e index de la API */}
        {/* toma la etiqueta de option y en dos de sus atributos deja los valores previamente mecionados (item e index), mientras dentro de la misma solo dejamos el item a seleccionar */}
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
      {/* Botón que acciona el Dark Mode con el evento de onClick */}
      <button className='toogleMode' onClick={toggleTheme}>
        {/* Se modifica la imagen al presionar el botón */}
        {theme.img}
      </button>
      </div>
    </header>
  )
}