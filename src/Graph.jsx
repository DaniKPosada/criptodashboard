import "./Graph.css" //Estilos de gráfica
import {useEffect, useState, useRef} from 'react' //Hooks de react
import { Line } from "react-chartjs-2"; //Regresa gráfico tipo linea con chartjs

import {
    Chart as ChartJS,
    CategoryScale,//Responsive
    LinearScale,//Responsive
    PointElement,//Punto al final de cada valor del graph
    LineElement,//dibuja la lines del graph
    Title,//Título
    Tooltip,//Crea el gráfico
    Filler,//LLena el graph
    Legend,//Etiqueta junta altítulo
  } from 'chart.js'; //Elemento de react que conforma la gráfica
import moment from "moment/moment"; //Analizar, validar, manipular,. y mostrar fechas y horas en JavaScript.

ChartJS.register( //Todos los gráficos tendrán estos plugings
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
) //LLamamos de la librería ChartJS
//Exportamos la gráfica con aglunos parametros iniciales a las props de la API
export default function Graph({type = 1, coin = "bitcoin", currency = "usd", days = 30,color = "#04D99D"}){
    const chartStyle = { //Estilos para la gráfica (Qué elementros no mostrar)
        border: {
            display: false
        },
        grid:{
            display: false,  
        },
        ticks: {
            display: false
        }
    }
    //url de API en una variable con template strings ya que dentro de esta tenemos JavaScript identifiers
    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
    let data , options
    const [prices, setPrices] = useState() //Precios en la gráfica
    const [dates, setDates] = useState() //Fechas en la gráfica
    const [gradient, setGradient] = useState() //Decgradado de color en la gráfica
    async function getData(){ //creamos una función asíncrona
        try{
            const response = await fetch(url)//hacemos el llamado de la API con el metodo interno de JS fetch
            const json = await response.json()//Juntamos la llamada de la API a un json() para su lectura
            //Función de precios que realiza .map al promp prices de la API, retornando el valor redondeado aproximado
            setPrices(json.prices.map(item => Math.round(item[1])))
            //Función de fechas que realiza .map al promp prices de la API, formatea el item con la fecha de Mes/Día
            setDates(json.prices.map(item => moment.unix(item[0]).format("MM-DD")))
        }catch(e){
            console.log("error:",e)
        }
    }
    const chartRef = useRef(null); //Hook useRef con un valor inicial nulo
    
    useEffect(_ => {
        getData() //Traemos la función asíncrona
        const canvas = chartRef.current.firstChild //Tomamos al primer elemento del chartFer
        let BGgradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height); //varible con propiedades del gradiante
        BGgradient.addColorStop(0, 'rgba(4, 191, 157, 1)'); //Primer paso de color en la gradiante
        BGgradient.addColorStop(1, 'rgba(4, 191, 157, 0)') //Segundo paso de color en la gradiante
        setGradient(BGgradient) //Variable del BGgradient como parametro a la función del gradiante en usestate
    },[])
    
    
    //Creamos un switch con diferente casos qie modifican la forma en como podemos ver las gráfocas del dashboard
    switch(type){
        case 0: //Primer caso de estilo en gráfica
            options = { //opciones de visualización
                responsive: true, //gráfica esponsive
                maintainAspectRatio: true, //Maniene su proporción
                plugins: {
                  legend: {
                    display: false, //Sin etiqueta superior
                  },
                  title: {
                    display: false, //Sin título sperior
                  }
                },
                scales: { //sin líneas de grafica en "x" y "y"
                    x:{
                        grid:{
                            display: false
                        }
                    },
                    y:{
                        grid:{
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.toUpperCase()}`;
                            }
                        }
                    }
                }
              }
            data = { //Valores de gráfica
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    backgroundColor: gradient, //color de "fill"
                    tension: .4, //tención en los puntos de cambio al traado de la línea entre puntos
                    pointRadius: 0, //puntos de gráfica
                    fill: true //Relleno de gráfica
                  }
                ]
              }
              break
        case 1: //Segundo caso de estilo en gráfica
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: { //usamos la variable que contiene los estios predeterinados en las líneas 30-40
                    x: chartStyle,
                    y: chartStyle
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    tension: .4,
                    pointRadius: 0,
                  }
                ]
              }
            break
    }
    return ( //gráfica a exportar
        <div ref={chartRef} className="graph">
            {/* Componete para mostar la gráfica con dos valores definidos dentro del switch */}
            <Line data={data} options={options}/>
        </div> 
    )
}