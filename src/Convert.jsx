import { useEffect, useState } from "react"; //hooks de react
import axios from "axios"; //Librería que nos ayuda a tener datos de la API más fácil
import InputConvert from "./InputConvert"; // Componente
import { FaExchangeAlt } from "react-icons/fa"; // Icono de react
import "./Convert.css"; // Estilos

export default function Convert() { //Hooks useState con valores iniciales / predeterminados 
  const [coin, setCoin] = useState([])
  const [selCoin1, setSelCoin1] = useState("btc")
  const [selCoin2, setSelCoin2] = useState("eth")
  const [mainTxt, setMainTxt] = useState(0)
  const [res, setRes] = useState(0)

  // Función asíncrona para obtener los datos de la API
  const getData = async () => {
    // Se hace la petición a la API
    const result = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
    );
    // Establecemos el valor de los datos obtenidos
    setCoin(result.data);
    // Para conocer los datos obtenidos en consola: console.log(result.data)
  };
  // Se obtienen los datos cuando el componente cargue
  useEffect(() => {
    getData() // Datos de la API
  }, []);
  useEffect(_ => { //Para cuando los datos del selector sean modificados
    let a,b
    coin.forEach(({symbol, current_price}) =>{ //Para cada prop hacemos un recorrido
      if(symbol == selCoin1){ //Si el simbolo es igual a la variable 1
        a = (mainTxt * current_price) / 1 //Multuplicamos su cantidad por el valor actual
      }else if(symbol == selCoin2){ //Si el simbolo es igual a la variable 2
        b = current_price //Dejamos el valor actual
      }
    })
    a /*True*/ ? setRes(a / b) /*Actualiza el useState*/ : /*Else*/ setRes(0) //Si "a" es true, dividinos el valor de "a" sobre "b"
  },[mainTxt,selCoin1,selCoin2])

  return ( //Regresamos al HTML
    <div className="contenedor">
      <h2>Comparación de Monedas</h2>

      <div className="input-convert">
        {/* Componente con variables y funciones definidas desde el padre (Convert) */}
        <InputConvert coin={coin} fun={setSelCoin1} other={selCoin2} text={setMainTxt} type={0} />
        {/* Ícono de react */}
        <FaExchangeAlt className="icono" />
        {/* Componente con variables y funciones definidas desde el padre (Convert) */}
        <InputConvert coin={coin} sel="eth" fun={setSelCoin2} other={selCoin1} result={res}/>
      </div>
    </div>
  );
}
