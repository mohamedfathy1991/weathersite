let day = document.querySelector("#day");
let monthDay = document.querySelector("#monthday");
let zone = document.querySelector("#lcationname");
let temperature = document.querySelector("#temp-c");
let weatherCondition = document.querySelector("#weather-condition");
let imageweather = document.querySelector("#imgageweather");
let nextdayName= document.getElementsByClassName('next-day')
let nextCondtionType= document.getElementsByClassName('next-condition-type')
let nextDayTemp= document.getElementsByClassName('next-cond-temp')
let nextDayIcon= document.getElementsByClassName('next-condtion-icon')




// fetch data for weather for three days f
async function weather(val) {
  try {
    const weatherData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=c1830b1a56ff4a03be8191253240301&q=${val}&days=3`
    );

    let data = await weatherData.json();
    console.log(data)

    let weakdayName = new Date(data.current.last_updated).toLocaleString(
      "en-us",
      { weekday: "long" }
    );
    let monthName = new Date(data.current.last_updated).toLocaleString(
      "en-us",
      { month: "long" }
    );
    let dayDigit = new Date(data.current.last_updated).getDate()
    

    zone.innerHTML = `${data.location.name}`;
    temperature.innerHTML = `${data.current.temp_c}c`;

    weatherCondition.innerHTML = `  ${data.current.condition.text}`;

     imageweather.src=`https:${data.current.condition.icon}`
  
    day.innerHTML = weakdayName;
    monthDay.innerHTML = dayDigit;
    monthDay.innerHTML += monthName;



    // print data for the next 2 days

    for(let i=1;i<3;i++){
      // name day of tomorrow and after tomorrow
      nextdayName[i-1].innerHTML= new Date( data.forecast.forecastday[i].date).toLocaleString(
        "en-us",
        { weekday: "long" })
        nextDayTemp[i-1].innerHTML=`${data.forecast.forecastday[i].day.maxtemp_c} c <br>
        ${data.forecast.forecastday[i].day.mintemp_c}c`
        nextCondtionType[i-1].innerHTML=data.forecast.forecastday[i].day.condition.text
        nextDayIcon[i-1].src=`https:${data.forecast.forecastday[i].day.condition.icon}`

        
    }


  } catch (err) {
    console.log(err);
  }
}
weather("menya");

async function getweather(value) {
  try {
    const weatherData = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=c1830b1a56ff4a03be8191253240301&q=${value}`
    );

    let data = await weatherData.json();
    if (data[0] != undefined) {
      let lang = data[0].lat;
      let lon = data[0].lon;
      weather(`${lang},${lon}`);
    } else {
      weather("menya");
    }
  } catch (err) {
    console.log(err);
  }
}


// to get current position and then get weather for position
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// get weather after get the current  location 
function showPosition(position) {
  weather(`${position.coords.latitude},${position.coords.longitude}`);
}

