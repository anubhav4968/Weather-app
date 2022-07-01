src="https://maps.google.com/maps?q=kanpur&t=&z=13&ie=UTF8&iwloc=&output=embed" 
function getData(){
    let city=document.getElementById("city").value;

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=591f731b18d6dc23e6d2e84f93c70863`


    fetch(url)
    .then(function(res){
        // console.log(res)//return body 
        return res.json();
    })
    .then(function (res){
        console.log(res);
        append(res)
        getWeather2(city)
    })
    .catch(function (err){
        console.log(err);
    })
}

function append(data)
{
    let container=document.getElementById("container");
    container.innerHTML=null;

    let ina=document.getElementById("i");
    ina.innerHTML=null;
    let i=document.createElement("i")
    i.setAttribute("class","fa-solid fa-city")
    i.setAttribute("id","i1")
    
    let i2=document.createElement("i")
    i2.setAttribute("class","fa-solid fa-temperature-arrow-down")
    i2.setAttribute("id","i2")
    

    let i3=document.createElement("i")
    i3.setAttribute("class","fa-solid fa-temperature-arrow-up")
    i3.setAttribute("id","i3")

    let i4=document.createElement("i")
    i4.setAttribute("class","fa-solid fa-sun")
    i4.setAttribute("id","i4")

    let i5=document.createElement("i")
    i5.setAttribute("class","fa-solid fa-temperature-high")
    i5.setAttribute("id","i5")

    let i6=document.createElement("i")
    i6.setAttribute("class","fa-solid fa-cloud")
    i6.setAttribute("id","i6")

    let i7=document.createElement("i")
    i7.setAttribute("class","fa-solid fa-sun")
    i7.setAttribute("id","i7")

    let i8=document.createElement("i")
    i8.setAttribute("class","fa-solid fa-wind")
    i8.setAttribute("id","i8")

    let i9=document.createElement("i")
    i9.setAttribute("class","fa-solid fa-thermometer")
    i9.setAttribute("id","i9")
   
    ina.append(i,i2,i3,i6,i4,i7,i8,i5,i9) 

    let map=document.getElementById("gmap_canvas")
    map.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    
    let name = document.createElement("p");
    name.innerText=`City: ${data.name}`;

    let clouds=document.createElement("p")
    clouds.innerText=`Clouds: ${data.clouds.all}`

    let sunr=document.createElement("p")
    sunr.innerText=`Sunrise: ${data.sys.sunrise}`

    let suns=document.createElement("p")
    suns.innerText=`Sunset: ${data.sys.sunset}`

    let wind=document.createElement("p")
    wind.innerText=`Wind: ${data.wind.speed}`

    let min = document.createElement("p");
    min.innerText=`Min-Temperature: ${Math.floor(data.main.temp_min-273)} C`;

    let max = document.createElement("p");
    max.innerText=`Max-Temperature: ${Math.ceil(data.main.temp_max-273)} C`;

    let current = document.createElement("p");
    current.innerText=`Current-Temperature: ${Math.floor(data.main.temp-273)} C`;

    let humidity = document.createElement("p");
    humidity.innerText=`Humidity: ${data.main.humidity}`;

    let lat=data.coord.lat
    let lon=data.coord.lon

    // getForeweather(lat,lon)

    container.append(name,min,max,clouds,sunr,suns,wind,current,humidity);
    document.getElementById("city").value=""
}



function getData2(lat,lon){
    let city=document.getElementById("city").value;
    

    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=591f731b18d6dc23e6d2e84f93c70863`


    fetch(url)
    .then(function(res){
        // console.log(res)//return body 
        return res.json();
    })
    .then(function (res){
        console.log(res);
        append(res)
        getWeather2(res.name)
    })
    .catch(function (err){
        console.log(err);
    })
}


function getweather(){
    navigator.geolocation.getCurrentPosition(success);

    function success(position)
    {
        var crd = position.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        getData2(crd.latitude,crd.longitude)
    }

}
 



async function getWeather2(city) {
    let show=document.getElementById("showData");
             show.innerHTML=null;
  
    try {

        //  let city = document.getElementById("city").value;
         console.log(city)

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=591f731b18d6dc23e6d2e84f93c70863&units=metric`)
        let data = await res.json()
        console.log("data:*********", data)
        var res2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely,current&appid=591f731b18d6dc23e6d2e84f93c70863`);
        var data2 = await res2.json();
        console.log("date2:", data2)
        const unixTime = data2.daily[0].dt;
        const date = new Date(unixTime * 100)



        for (var i = 0; i < data2.daily.length-1; i++) {

            
            let box = document.createElement("div");
            box.setAttribute("class","box")
            let dateBox = document.createElement("h4");

            const unixTime = data2.daily[i].dt;
            const date = new Date(unixTime * 1000)

            dateBox.innerText = date;
            console.log(dateBox);

            let minTempBox = document.createElement("h4");
            minTempBox.innerText = `MinTemp:${data2.daily[i].temp.min}°C`;

            let maxTempBox = document.createElement("h4");
            maxTempBox.innerText = `MaxTemp:${data2.daily[i].temp.max}°C`


            var weather = document.createElement("h4");
            weather.innerText =`Whether: ${data2.daily[i].weather[0].main}`;
           
            box.append(dateBox, minTempBox, maxTempBox, weather)
            document.getElementById("showData").append(box)

        }




    }
    catch (err) {
        console.log(err)
    }

}













