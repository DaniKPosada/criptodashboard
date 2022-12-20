import React from 'react';
import './Header.css'; //Estilos
import { useTheme } from './Context/ThemeProvider'; //IMportacioń de un tema oscuro que no funciona
//de una vez se exporta per al mimos tiempo se declara la función y sus propiedades. 
export default function Header({currencys, fun, cur}){ 
  // currency = Estado actual de moneda
  // fun = Redondear los valores
  // cur = Moneda/Valor
  const {theme, toggleTheme} = useTheme();
  
  return ( //Estructurando el header en jsx
    <header className='app-header'>
      <p>Crypto Stadistics</p>
      <div className='select-button'>
      {/* funciones en el selector-*/}
      {/* código para mostrar el desplegable que indica la moneda con la que se va a comparar cada tarjeta y así mismo
      recorre laws tarjetas y cambia el valor de comparación*/}
      <select value={cur} name="coinSelect" id="coinSelect" onChange={() => {fun(document.getElementById("coinSelect").value)}}>
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
      {/* Botón para 'activar'  Dark Mode con  onClick */}
      <button className='toogleMode' onClick={toggleTheme}>
        {/* Se cambia la imagen del sol por la de lunita presionando el botón */}
        {theme.img}
      </button>
      </div>
    </header>
  )
}