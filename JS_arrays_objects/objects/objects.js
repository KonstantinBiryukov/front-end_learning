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
    var maxCitiesQuantity = 0;
    for (var i = 0; i < countriesArray.length; i++) {
        var currentCitiesQuantity = countriesArray[i].cities.length;
        if (currentCitiesQuantity > maxCitiesQuantity) {
            maxCitiesQuantity = currentCitiesQuantity;
            var maxCitiesCountryName = countriesArray[i].name;
        }
    }
    return maxCitiesCountryName;
}

console.log("Max quantity of cities in " + findCountryWithMaxCitiesQuantity(countriesArray));

// (3)
function getSumPopulation(countries) {
    var sumPopulation = {};
    for (var i = 0; i < countries.length; i++) {
        var totalPopulation = 0;
        var countryName = countries[i].name;
        for (var j = 0; j < countries[i].cities.length; j++) {
            totalPopulation += countries[i].cities[j].population;
        }
        sumPopulation[countryName] = totalPopulation;
    }
    return sumPopulation;
}

var countriesPopulation = getSumPopulation(countriesArray);
console.log(countriesPopulation);