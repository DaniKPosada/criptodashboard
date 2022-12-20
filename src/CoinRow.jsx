import React from "react";
import "./coinRow.css" //Estilos de cointow
import Graph from './Graph' //Componente hijo
import {deleteDec, colorDec, numberF} from './App' //Funciones que se deginieron en app
//función que determina la estructura de la tabla final. 
export default function CoinRow({ coin, index }) {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="coin_image_container">
            {/*según la moneda se asigna su icono */}
            <img src={coin.image} title={coin.name} alt={coin.name} />
        </div>
      </td>
      <td>{numberF.format(coin.current_price)}US$</td> {/* formato del precio actual de la moneda */}
      {/* porcentaje de subida o bajada de la moneda*/}
      <td className={colorDec(coin.market_cap_change_percentage_24h)}>{deleteDec(coin.market_cap_change_percentage_24h, 2)}%</td> 
      <td>{numberF.format(coin.total_volume)}US$</td> {/* formato del volumen total */}
      <td>{numberF.format(coin.market_cap)}US$</td> {/* capitalización de la moneda */}
      <td><Graph coin={coin.id} days={7} color={colorDec(coin.market_cap_change_percentage_24h)}/></td> {/* grafica en la columna final */}
    </tr>
  );
}
