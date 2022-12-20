import React from "react";
import "./coinRow.css" //Estilos
import Graph from './Graph' //Componente de gráfica
import {deleteDec, colorDec, numberF} from './App' //Funciones globales
//Exportamos la función de CoinRow
export default function CoinRow({ coin, index }) {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="coin_image_container">
            {/* por cada moneda (Index creado) añadimos su imagen */}
            <img src={coin.image} title={coin.name} alt={coin.name} />
        </div>
      </td>
      <td>{numberF.format(coin.current_price)}US$</td> {/* Le damos formato al precio ancual de la moneda */}
      <td className={colorDec(coin.market_cap_change_percentage_24h)}>{deleteDec(coin.market_cap_change_percentage_24h, 2)}%</td> {/* Modificamos el valor de la prop con la función de colorDec y deleteDec (a 2 decimales) */}
      <td>{numberF.format(coin.total_volume)}US$</td> {/* Le damos formato al vol. total ancual de la moneda */}
      <td>{numberF.format(coin.market_cap)}US$</td> {/* Le damos formato a la capitalización ancual de la moneda */}
      <td><Graph coin={coin.id} days={7} color={colorDec(coin.market_cap_change_percentage_24h)}/></td> {/* Añadimos el gráfico y modificamos su estico con la función colorDec */}
    </tr>
  );
}
