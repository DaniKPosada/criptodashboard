import React from "react"; 
import "./tableCoins.css"; //Estilos
import CoinRow from "./CoinRow"; //Componente
//Function TableCoins con prop de "coins"
function TableCoins({ coins }) {
  return ( //Regresamos la estructura HTML
    <table className="table_coins">
      <thead>
        <tr>
          <td>#</td>
          <td>Moneda</td>
          <td>Precio</td>
          <td>24h</td>
          <td>Vol. total</td>
          <td>Cap. mercado</td>
          <td>Ultimos 7 dias</td>
        </tr>
      </thead>
      <tbody>
        {/* creamos un array coins con .map que retorna el componete CoinRow por cada índice presente en las props "coin" e "index"*/}
        {coins.map((coin, index) => (
          <CoinRow coin={coin} key={index} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
}

export default TableCoins;
