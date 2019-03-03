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
            name: "Ekaterinburg",
            population: 1468833
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
    var countryWithMaxCities = [];
    var maxCitiesQuantity = 0;
    countriesArray.forEach(function (country) {
        var currentCitiesQuantity = country.cities.length;
        if (currentCitiesQuantity >= maxCitiesQuantity) {
            maxCitiesQuantity = currentCitiesQuantity;
            countryWithMaxCities.push(country.name);
        }
    });
    return countryWithMaxCities;
}

console.log("Max quantity of cities in " + findCountryWithMaxCitiesQuantity(countriesArray));

// (3)
function getSumPopulation(countries) {
    var sumPopulation = {};
    countries.forEach(function (countriesArray) {
        var countryName = countriesArray.name;
        sumPopulation[countryName] = countriesArray.cities.reduce(function (totalPopulation, cities) {
            totalPopulation += cities.population;
            return totalPopulation;
        }, 0);
    });
    return sumPopulation;
}

console.log(getSumPopulation(countriesArray));