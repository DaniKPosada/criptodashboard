import { useEffect, useState } from 'react' //Importación de Hooks de react
import "./App.css"; // Unica Hoja de estilos hecha por mis compañeros


//----------Componentes que forman el dashboard
import CardPrincipal from './CardPrincipal'; 
import TableCoins from './TableCoins'; //componente de la tabla al final del dashboard
import Card from './Card' //se refiere a las pequeñas tarjetas del lado derecho
import Convert from './Convert'; //convierte las monedas
import Footer from './Footer' //se refiere al footer
import Header from './Header' //se refiere al header

//Componente Dark mode
import {ThemeProvider} from "./Context/ThemeProvider";

//Funcionalidades para todo  el código
//Redondeo y aproximación a cifras significativas para acortar el numero decimal
export function deleteDec(val, decimal) {
  return val.toFixed(decimal)
}
//Cambia el color si el resultado es menor o mayor a 0
export function colorDec(num) {
  return num > 0 ? "green" : "red"
}
//Establece el formato de los números al español
export const numberF = Intl.NumberFormat("es-ES")

//-Funcion default todos los componentes
export default function App() {
  const [coins, setCoins] = useState() // Hooks para las Monedas
  const [currency, setCurrency] = useState() //Hook del valor actual
  const [selCur, setSelCur] = useState("usd") //Hook para el Tipo de moneda
  const getData = async () => { //LLamado de la API asíncrono
    //Código utilizado para el llamado de las informaciones necesarias desde la API. 
    //dentro de la url se define la variable selcur que permitirá traer los nuevos datos deseados cuando este cambie
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`)
    
    const json = await response.json() 
    const response_cur = await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
    const cur = await response_cur.json() 
    setCoins(json)
    setCurrency(cur)
  }
  useEffect(() => { //Realiza la primer acción en el VDOM después del DOM
    getData() //Función para invocar la API
  }, [])
  useEffect(() => { //Actualizar la info cuando el selCur cambie
    getData()
  }, [selCur]) 

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
        {/*Componentes internos de este componente junto a sus props*/}
        <Convert />
        <TableCoins coins={coins} />
        <Footer />
      </div>
    )
  )
}