//axios importeren
import axios from "axios";


//make a reference to element
const first = document.getElementById('first')
const list = document.getElementById('countrys')


//make an asynchrone function that makes a GET request, using Axios
async function fetchData() {

    //create a list item for first country name
    const firstName = document.createElement('li');
    //create a list item for first country population
    const firstPop = document.createElement('li')


    try {
        const response = await axios.get(
            //endpoint all
            'https://restcountries.com/v2/all');

        //log data in console
        console.log(response);
        //log name of first country in console
        console.log(response.data[0].name)

        //add items firstName
        firstName.setAttribute('class', 'firstCountryName')
        firstName.textContent = response.data[0].name
        first.appendChild(firstName)

        //add items firstPop
        firstPop.setAttribute('class', 'firstCountryPop')
        firstPop.textContent = `Has a population of ${response.data[0].population} people.`;
        first.appendChild(firstPop)


        //sort at population
        response.data.sort((a,b)=>{
            return a.population - b.population
        })



        //map method
        response.data.map((info) => {

            //get names
            const countryName = document.createElement('li');
            countryName.setAttribute('class', 'name');
            //give names color by region
            if (info.region === 'Africa') {
                countryName.setAttribute('class', 'africa');
            } else if (info.region === 'Americas') {
                countryName.setAttribute('class', 'americas');
            } else if (info.region === 'Europe') {
                countryName.setAttribute('class', 'europe')
            } else if (info.region === 'Asia') {
                countryName.setAttribute('class', 'asia');
            } else if (info.region === 'Oceania') {
                countryName.setAttribute('class', 'oceania');
            } else {
                countryName.setAttribute('class', 'else')
            }
            countryName.textContent = info.name;
            list.appendChild(countryName)


            // get flags
            const countryFlag = document.createElement('img');
            countryFlag.setAttribute('class', 'flag');
            countryFlag.setAttribute('src', info.flag);
            list.appendChild(countryFlag);


            //get population
            const countryPopulation = document.createElement('li');
            countryPopulation.setAttribute('class', 'population');
            countryPopulation.textContent = `Has a population of ${info.population} people.`;
            list.appendChild(countryPopulation);

            //get region
            const countryRegion = document.createElement('li');
            countryRegion.setAttribute('class', 'region');
            countryRegion.textContent = info.region;
            list.appendChild(countryRegion);


        })


        //catch errors
    } catch (err) {
        console.error(err);
        //Reference to error message
        const errorMessage = document.getElementById('error-message')
        if (err.response.status === 404) {
            errorMessage.textContent = "Page Not Found | 404";
        }
        if (err.response.status === 500) {
            errorMessage.textContent = "Internal Server Error | 500";
        }
    }

}

fetchData()








