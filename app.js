const search = document.getElementById('search');
const button = document.getElementById('button');
const keyValue = 'abe8bdfec8e84dfc86083021230410';

const body = document.querySelector('body');
const icon = document.getElementById('img');
const locationData = document.querySelector('.location');
const regionData = document.querySelector('.region');
const countryData = document.querySelector('.country');
const conditionData = document.querySelector('.conditionDetails');
const celsiusData = document.querySelector('.celsius');
const fahrenheitData = document.querySelector('.fahrenheit');
const isDayData = document.querySelector('.isDay');
const timeData = document.querySelector('.time');
const speedData = document.querySelector('.speed');

button.addEventListener('click', async function(){
	try{
		const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${keyValue}&q=${search.value}`,{mode:'cors'});
		const weatherData = await response.json();
		console.log(weatherData);
		const name = weatherData.location.name;
		const region = weatherData.location.region;
		const country = weatherData.location.country;
		const condition = weatherData.current.condition.text;
		const celsius = weatherData.current.temp_c;
		const fahrenheit = weatherData.current.temp_f;
		const time = weatherData.current.last_updated;
		const isDay = weatherData.current.is_day === 1 ? 'Day':'Night';
		const wind = weatherData.current.wind_kph;
		
		console.log(typeof(condition));
		updateData(name, region, country, condition, celsius, fahrenheit, time, isDay, wind);
		updateDay(isDay);
		updateIcon(condition);
		console.log(`Location:${name}, region:${region}, Country:${country}, celsius:${celsius}°C, fahrenheit:${fahrenheit}°F, isDay:${isDay}, wind speed:${wind}km/h, time:${time}, Condition:${condition}`);
	}catch(e){
		console.log(e);
		const error = document.createElement('div');
		error.innerText = 'No matching location found.';
		error.style.color = 'white';
		error.style.textAlign = 'centre';
		body.appendChild(error);
	}
}
);

const updateData = (location, region, country, condition, celsius, fahrenheit, time, isDay, speed)=>{
	console.log('inside');
	locationData.innerText = `Location: ${location}`;
	regionData.innerText = `Region: ${region}`;
	countryData.innerText = `Country: ${country}`;
	conditionData.innerText = condition;
	celsiusData.innerText = `${celsius}° C`;
	fahrenheitData.innerText = `${fahrenheit}° F`;
	isDayData.innerText = isDay;
	timeData.innerText = time;
	speedData.innerText = `Wind speed: ${speed} km/h`;
};

const updateDay = (isDay) => {
	if(isDay === 'Day'){
		body.classList.remove('night');
		body.classList.add('day');
	}else if(isDay === 'Night'){
		body.classList.remove('day');
		body.classList.add('night');
	}
};

const updateIcon = (condition) => {
	if (condition === 'Partly cloudy' || condition === 'Overcast'){
		icon.src = '/images/clouds.png';
	}
	if (condition === 'Mist' || condition === 'Fog'){
		icon.src = '/images/mist.png';
	}
	if (condition === 'Clear' || condition === 'Sunny'){
		icon.src = '/images/clear.png';
	}
	if (condition === 'Humidity'){
		icon.src = '/images/humidity.png';
	}
	if (condition === 'Rain' || condition === 'Raining'){
		icon.src = '/images/rain.png';
	}
	if (condition === 'Snow' || condition === 'Snowing'){
		icon.src = '/images/snow.png';
	}
	return '';
};