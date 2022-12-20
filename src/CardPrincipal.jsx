import { FaPlay } from "react-icons/fa"; //Icons de React
import './cardPrincipal.css' //Estilos
import { deleteDec, colorDec } from './App' //Funciones glogales
import Graph from "./Graph"; //Componente de gráfica

//Función que retorna los valores dentro de la API guardados previamente en el json
function CardPrincipal({ json: {
    id,
    symbol,
    current_price,
    image,
    price_change_percentage_1h_in_currency, //Porps  de la API
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    price_change_percentage_30d_in_currency,
    price_change_percentage_1y_in_currency
}, cur = "usd" }) {


    return (
        <> {/*Fragments que puede ser un (Div vacío)*/}
            <article className="cripto-first">
                <div className="cripto-title">
                    {/* Ya que en el  App.js se estableció  el valor inicial de la moneda como: 
                    "json={coins[0]" como resultado vemos los resultados del Bitcoin */}
                    <img src={image} alt="Icono de cripto" />
                    {/* Escribimos el texto de los valores presentes dentro del <h2> */}
                    <h2>{symbol} - {current_price} {cur}</h2>
                    {/*Modificación de la prop llamada con las funciones de colorDec y deleteDec */}
                    <h2><FaPlay className={`icon-arrow ${colorDec(price_change_percentage_30d_in_currency)}`} />{deleteDec(price_change_percentage_30d_in_currency, 2)}%</h2>
                </div>
                {/* Gráfica */}
                <div className="graphic">
                    {/* EL componente de Graph tiene tres valores */}
                    <Graph type={0} coin={id} currency={cur} />
                </div>
                {/* Capitalización */}
                <div className="capitalization">
                    <h2>Capitalización</h2>
                    <table className="capitalization-table">
                        <thead>
                            <tr>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>1m</th>
                                <th>1y</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* Uso de las props de la API y se modifican con colorDec y deleteDec */}
                                <td className={colorDec(price_change_percentage_1h_in_currency)}>{deleteDec(price_change_percentage_1h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_24h_in_currency)}>{deleteDec(price_change_percentage_24h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_7d_in_currency)}>{deleteDec(price_change_percentage_7d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_30d_in_currency)}>{deleteDec(price_change_percentage_30d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_1y_in_currency)}>{deleteDec(price_change_percentage_1y_in_currency, 2)}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </>
    );
}
/* Exportamos el componente */
export default CardPrincipal;