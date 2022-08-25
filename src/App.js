import React, { useEffect, useState } from 'react';
import './App.css';
import Cards from './components/Cards'
import Nav from './components/Nav'
import axios from 'axios'

export default function App() {

  const [cities, setCities] = useState([])

  const apiKey = '4ae2636d8dfbdc3044bede63951a019b'

  //busqueda
  function onSearch(search) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`)
      .then(r => r.json())
      .then((recurso) => {
        console.log(recurso)
        if (recurso.main !== undefined) {
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          console.log(ciudad)
          if (cities.map(c => c.name.toLowerCase()).includes(ciudad.name.toLowerCase())) {
            alert("Esta ciudad esta siendo mostrada en la pantalla, por favor fijese que se encuentre listada");
          }
          if (!cities.map(c => c.name.toLowerCase()).includes(ciudad.name.toLowerCase())) {
            setCities(oldCities => [...oldCities, ciudad]);
          }
        } else {
          alert("Ciudad no encontrada");
        }
      });
  }

  //Eliminar
  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id != id));
  }

  //Ciudades por default
  function defaultCities(search) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`)
      .then(r => r.json())
      .then((recurso) => {
        console.log(recurso)
        if (recurso.main !== undefined) {
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          console.log(ciudad)
          setCities(oldCities => [...oldCities, ciudad]);
        } else {
          alert("Ciudad no encontrada");
        }
      });
  }

  useEffect(() => {
    defaultCities('Corrientes')
    defaultCities('Mendoza')
    defaultCities('Buenos Aires')
  }, [])

  return (
    <div className="App">
        <Nav onSearch={onSearch} />
        <Cards cities={cities} onClose={onClose} />
    </div>
  );
}
