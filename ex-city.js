// 📌 In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:

// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).

// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).

// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).

// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.

// ✅ Scrivi la funzione getDashboardData(query), che deve:

// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"


// 📁 Esempio di output atteso
// // Risposta API
// {
//   city: "London",
//   country: "United Kingdom",
//   temperature: 18,
//     weather: "Partly cloudy",
//   airport: "London Heathrow Airport"
// }
// ​
// // Output in console
// London is in United Kingdom. 
// Today there are 18 degrees and the weather is Partly cloudy.
// The main airport is London Heathrow Airport.



async function getDashboardData(query) {
    const cityPromise = fetch(`http://localhost:3333/destinations?search=${query}`).then(res => res.json())
    const weatherPromise = fetch(`http://localhost:3333/weathers?search=${query}`).then(res => res.json())
    const airportPromise = fetch(`http://localhost:3333/airports?search=${query}`).then(res => res.json())

    const [cities, weathers, airports] = await Promise.all([cityPromise, weatherPromise, airportPromise])


    const city = cities[0].name
    const country = cities[0].country
    const temperature = weathers[0].temperature
    const weather = weathers[0].weather_description
    const airport = airports[0].name

    
    return {city, country, temperature, weather, airport}
}



getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));

