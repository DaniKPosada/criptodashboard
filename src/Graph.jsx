import "./Graph.css" //Estilos de gráfica
import {useEffect, useState, useRef} from 'react' //Hooks de react
import { Line } from "react-chartjs-2"; //Retorna el gráfico tipo linea con chartjs

import {
    Chart as ChartJS,
    CategoryScale,//Otorga capacidad responsiva al grafico
    LinearScale,//Otorga capacidad responsiva al grafico
    PointElement,
    LineElement,//dibuja la linea de la grafica
    Title,//Título
    Tooltip,//Crea la gráfica
    Filler,//LLena la gráfica
    Legend,//Etiqueta del título
  } from 'chart.js'; //Elemento de react para la gráfica
import moment from "moment/moment"; // fechas y horas en JavaScript.

ChartJS.register( //Caracteristicas o funciones para dibujar los demás gráficos
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
) 
export default function Graph({type = 1, coin = "bitcoin", currency = "usd", days = 30,color = "#04D99D"}){
    const chartStyle = { //Estilos que no se mostrarán en los gráficos
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
    //url de API en una variable con template strings
    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
    let data , options
    const [prices, setPrices] = useState() //Precios
    const [dates, setDates] = useState() //Fechas 
    const [gradient, setGradient] = useState() //Decgradado de color 
    async function getData(){ //Se crea la función asíncrona
        try{
            const response = await fetch(url)//se llama a a la API con el metodo interno de JS fetch
            const json = await response.json()//Se transforma a un json para leer
            //Función de precios que  retorna el valor redondeado aproximado
            setPrices(json.prices.map(item => Math.round(item[1])))
            //Función de fechas que  formatea el item con la fecha de Mes/Día
            setDates(json.prices.map(item => moment.unix(item[0]).format("MM-DD")))
        }catch(e){ //catch para un error en el eventod
            console.log("error:",e)
        }
    }
    const chartRef = useRef(null); //Hook useRef con un valor inicial nulo
    
    useEffect(_ => {
        getData() 
        const canvas = chartRef.current.firstChild //Se llama el primer elemento del chartFer
        let BGgradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height); //propiedades  gradiante
        BGgradient.addColorStop(0, 'rgba(4, 191, 157, 1)'); //Primer paso de color 
        BGgradient.addColorStop(1, 'rgba(4, 191, 157, 0)') // Degundo paso paso de color
        setGradient(BGgradient)
    },[])
    
    
    //Switch con casos para que las gráficas se modifiquen según el caso del responsive
    switch(type){
        case 0:
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
                scales: { 
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
            data = { 
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    backgroundColor: gradient,
                    tension: .4, 
                    pointRadius: 0, 
                    fill: true 
                  }
                ]
              }
              break
        case 1: 
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
                scales: { 
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
    return ( 
        <div ref={chartRef} className="graph">
            {/* Componete que muestra la gráfica con sus props desde el switch  */}
            <Line data={data} options={options}/>
        </div> 
    )
}