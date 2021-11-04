const API_KEY = "1ff8e50dca959c16e78209dad010425c";

const button = document.getElementById("botonBuscar");
const input = document.getElementById("inputBuscar");
const select = document.getElementById("select");



const dataLocalStorage = JSON.parse(localStorage.getItem("dataGuardada"));

if (dataLocalStorage != null) {
    crearH2Ciudad(dataLocalStorage);
    crearDetallesClima(dataLocalStorage);
} 

button.addEventListener("click", () => {
    buscarCiudad(input.value, select.value);
});

function buscarCiudad(ciudad, unidadMedida){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=${unidadMedida}`)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(respuestaParseada){
        console.log(respuestaParseada);
        guardarData(respuestaParseada);
        if (document.querySelector("#divContenedor")) {
            document.querySelector("#divContenedor").remove();
            document.querySelector("#divDetalles").remove();
            // let div1 = document.createElement("div");
            // let div2 = document.createElement("div");
            // div1.setAttribute("id", "divContenedor");
            // div2.setAttribute("id", "divDetalles");
            // document.querySelector("#auxiliar").append(div1, div2);
        }
        crearH2Ciudad(respuestaParseada);
        crearDetallesClima(respuestaParseada);
    })
    .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
}

function guardarData (data){
    localStorage.setItem("dataGuardada", JSON.stringify(data));
}

function crearH2Ciudad (nombre) {
    let nombreCiudad = document.createElement("h2");
    nombreCiudad.setAttribute("id", "h2");
    nombreCiudad.innerHTML = `${nombre.name}`;
    let container = document.getElementById("auxiliar");
    let divContenedor = document.createElement("div");
    divContenedor.setAttribute("id", "divContenedor");
    divContenedor.setAttribute("class", "col-12 col-md-6");
    
    let temperatura = document.createElement("p");
    temperatura.setAttribute("class", "temperatura");
    temperatura.innerHTML = `<span>${nombre.main.temp}°</span>`;

    divContenedor.append(nombreCiudad, temperatura);
    container.appendChild(divContenedor);

    nombreCiudad.style.background = `url(https://openweathermap.org/img/wn/${nombre.weather[0].icon}@2x.png) no-repeat top`;


}

function crearDetallesClima (detalles) {
    let container = document.getElementById("auxiliar");
    let divDetalles = document.createElement("div");
    divDetalles.setAttribute("id", "divDetalles");
    divDetalles.setAttribute("class", "col-12 col-md-6");

    let sensacion = document.createElement("p");
    sensacion.innerHTML = `Sensación térmica: ${detalles.main.feels_like}°`;

    let tempMin = document.createElement("p");
    tempMin.innerHTML = `Temperatura mínima: ${detalles.main.temp_min}°`;

    let tempMax = document.createElement("p");
    tempMax.innerHTML = `Temperatura máxima: ${detalles.main.temp_max}°`;

    let humedad = document.createElement("p");
    humedad.innerHTML = `Humedad: ${detalles.main.humidity}%`;

    let presion = document.createElement("p");
    presion.innerHTML = `Presión atmosférica: ${detalles.main.pressure}`;

    let viento = document.createElement("p");
    viento.innerHTML = `Velocidad del viento: ${detalles.wind.speed} km/h`;


    divDetalles.append(sensacion, tempMin, tempMax, humedad, presion, viento);
    container.appendChild(divDetalles);
}
