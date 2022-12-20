import { useEffect, useState } from 'react' //Hooks de react
import "./App.css"; //Hoja de estilos


//----------Componentes
import CardPrincipal from './CardPrincipal';
import TableCoins from './TableCoins';
import Card from './Card'
import Convert from './Convert';
import Footer from './Footer'
import Header from './Header'

//Componente Dark mode
import {ThemeProvider} from "./Context/ThemeProvider";

//----------------Funciones golbales para el código
//Acorta los números decimales
export function deleteDec(val, decimal) {
  return val.toFixed(decimal)
}
//Cambia el color dependiendos si el resultado es menor o mayor a 0
export function colorDec(num) {
  return num > 0 ? "green" : "red"
}
//Toma el formato de los números al español
export const numberF = Intl.NumberFormat("es-ES")

//----------------Funcion default con todos los componentes
export default function App() {
  const [coins, setCoins] = useState() //Monedas
  const [currency, setCurrency] = useState() //Valor actual
  const [selCur, setSelCur] = useState("usd") //Tipo de moneda
  const getData = async () => { //LLamado de la API asíncrono
    //hacemos el llamado de la API con el metodo interno de JS fetch,
    //usamos las template strings ya que dentro de la URL contamos con una variable de cambio declarada en el use state de la línea 32
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`)
    //Juntamos la llamada de la API a un json() para su lectura
    const json = await response.json() //Información primaria (Global) - Información de API de acuerdo al selector
    //realizamos el llamado de una segunda API de la misma forma
    const response_cur = await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
    const cur = await response_cur.json() //Información secundaria - Selec de datos
    setCoins(json)//Dentro de la función setCoins agregamos el parámetro del json - Información de las API
    setCurrency(cur)//Cambio de información en la página de acuerdo a la var cur
  }
  useEffect(() => { //Realiza la primer acción en el VDOM después del DOM
    getData() //Función API
  }, [])
  useEffect(() => { //Actualiza la info cuando el selCur ha sido modificado
    getData()
  }, [selCur]) //var selCur

  return ( //Regresamos componentes en etiquetas
    !coins ? "Cargando..." : ( //Operador ternario que funciona mientras la página se encuentra cargando
    //Primer div de contenido
      <div className='App'>
        <ThemeProvider> {/* Llamamos al comonente de ThemeProvider */}
          {/* Dentro de este componente agregamos el Header con dos variables y una función modificando su nombre */}
          <Header currencys={currency} fun={setSelCur} cur={selCur} /> 
        </ThemeProvider>
        <main>
          {/* Llamamos al componente de CardPrincipal con dos variables modificando su nombre */}
          <CardPrincipal json={coins[0]} cur={selCur} /> {/* coins desde 0 por los bitcoins */}
          <div className="cards_con">
            {/* Con .map regresamos un array que lee los parámetros que necesitamos de la API,
            dentro de este usamos una función flecha con la condición en caso de que el index sea diferente a 0... */}
            {coins.map(({ id, symbol, image, current_price, price_change_percentage_30d_in_currency }, index) => {
              if (index !== 0) {
                //el componete Card con los parámetros previamente solicitados dentro del mismo modificando sus nombres o creando un mensaje con estos
                //así mismo usamos una de las funciones previamente creadas llamadas en este caso como "Funciones globales" para modificar el valor dentro de su parámetro
                return <Card key={index} price={`${symbol} - ${current_price} ${selCur} `} porcentaje={deleteDec(price_change_percentage_30d_in_currency, 2)} img={image} coinId={id} cur={selCur} />
              }
            })
            }
          </div>
        </main>
        {/* Llamamos al componente de Convert */}
        <Convert />
        {/* Llamamos al componente de TableCoins dentro de él la variable de coins */}
        <TableCoins coins={coins} />
        {/* Llamamos al componente de Footer */}
        <Footer />
      </div>
    )
  )
}