/*
1) Создайте массив объектов-стран (пусть будет несколько стран)
•  У страны есть название и список городов (пусть будет по несколько городов)
•  У города есть название и численность населения
2) Найдите страну/страны с максимальным количеством городов
3) Получите объект с информацией по всем странам такого вида:
   ключ – название страны, значение – суммарная численность по стране
 - Оформите код в виде функций
*/
// (1)
var russia = {
    name: "Russia",
    cities: [
        {
            name: "Novosibirsk",
            population: 1612833
        },
        {
            name: "Moscow",
            population: 15512000
        },
        {
            name: "Saint-Petersburg",
            population: 5381736
        },
        {
            name: "Omsk",
            population: 1172070
        },
        {
            name: "Perm",
            population: 1051583
        }
    ]
};

var usa = {
    name: "USA",
    cities: [
        {
            name: "Seattle",
            population: 608660
        },
        {
            name: "Washington, D.C.",
            population: 601723
        },
        {
            name: "Boston",
            population: 625087
        },
        {
            name: "Portland",
            population: 647805
        },
        {
            name: "New Orleans",
            population: 393292
        }
    ]
};

var poland = {
    name: "Poland",
    cities: [
        {
            name: "Warsaw",
            population: 1764615
        },
        {
            name: "Krakow",
            population: 769498
        },
        {
            name: "Gdansk",
            population: 464829
        }
    ]
};

var countriesArray = [russia, usa, poland];
console.log(countriesArray);

// (2)
function findCountryWithMaxCitiesQuantity(countriesArray) {
    var countriesWithMaxCities = [];
    var maxCitiesQuantity = 0;

    // to find and define a maximum
    countriesArray.forEach(function (countries) {
        if (countries.cities.length > maxCitiesQuantity) {
            maxCitiesQuantity = countries.cities.length;
        }
    });

    // to compare all countries with max value and add appropriate ones to array
    countriesArray.forEach(function (countriesArray) {
        if (countriesArray.cities.length === maxCitiesQuantity) {
            countriesWithMaxCities.push(countriesArray.name);
        }
    });

    return countriesWithMaxCities;
}

console.log("Max quantity of cities in: " + findCountryWithMaxCitiesQuantity(countriesArray));

// (3)
function getSumPopulation(countries) {
    var sumPopulation = {};
    countries.forEach(function (countriesArray) {
        var countryName = countriesArray.name;
        sumPopulation[countryName] = countriesArray.cities.reduce(function (totalPopulation, cities) {
            return totalPopulation + cities.population;
        }, 0);
    });
    return sumPopulation;
}

console.log(getSumPopulation(countriesArray));