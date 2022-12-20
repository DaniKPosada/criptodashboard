import "./Card.css" //estilos del componente
import Graph from "./Graph" //componnete de gráficas
import {colorDec} from './App' //función de app
//de una se declara y exporta la función
export default function Card({coinId, cur, porcentaje, price, img}){
    return (
        <div className="card">
            {/* recorre desde la primer imágen del parámetro ya que en App.js CardPrincipal tiene como valor en json 0 */}
            <img src={img} alt=""/>
            <div className="con-main">
                <div className="con-title">
                    {/* se muestran los datos de las tarjetas al aldo de la tarjeta principal */}
                    <h2 className={`price ${colorDec(porcentaje)}`}>{price}</h2>
                    {/* Porcentaje de cada tarjeta */}
                    <h4 className={`porcentajes ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                {/* Gráfica de cada tarjeta */}
                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/>
            </div>
        </div>
    )
}