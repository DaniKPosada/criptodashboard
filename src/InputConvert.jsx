import React, {useState, useRef} from "react"; //Hooks react
import "./Convert.css"; //Esilos
import {deleteDec} from './App' //Funcion global
//Exportamos la función de ImputConvert la cuál desarrolla el cambio de moneda a moneda dentro de "Comparación de monedas"
export default function InputConvert({ coin,  sel = "btc", fun, other,text, type = 1, result = 0}) { //Props
  const selRef = useRef(null)//Hook useRef con un valor inicial nulo
  const [selVal, setSelVal] = useState(sel) 

  return (
    <> {/*Fragments (Div vacío)*/}
      <div className="input">
        {/* con un evento de click si el valor dentro del imput es 0 se deja como un número */}
        {(type === 0) ? <input type="number" placeholder="0" onChange={e => {text(parseFloat(e.target.value))}}/>//Pasa a ser un valor numérico que se usa en la operación
        //Si es diferente de 0 modificamos su resultado con deleteDec mostrando los primeros 4 decimales y sin dejar acceder al valor con readOnly
        : <input type="number" placeholder="0" value={deleteDec(result, 4)} readOnly={true}/>}
        
        <div className="select">
          {/* Imagen modificada dependiendo la moneda */}
          <img src="" alt="" />
          {/* Elementos dentro del select */}
          <select value={selVal} ref={selRef} onChange={() => {
              setSelVal(selRef.current.value) //En el prámetro de setSelVal dejamos la var selRef con su valor actual
              fun(selRef.current.value) //Repetimos lo mismo en "fun"
            }}>
            {coin.map((co) => { //A una función cramos su array recorriendo los datos de co en .map
              if(co.symbol === selVal){ //si el simbolo de la moneda es igual al valor 
                selRef.current.previousSibling.src = co.image //seleccionamos la referencia previa del elemento y añadimos su imagen
                return <option value={co.symbol} key={co.id}>{co.symbol}</option>
              }else if(co.symbol != other){ //si es diferente
                return <option value={co.symbol} key={co.id}>{co.name}</option> //aparecen las diferentes opciones de selección
              }
            })}
          </select>
        </div>
      </div>
    </>
  );
}
