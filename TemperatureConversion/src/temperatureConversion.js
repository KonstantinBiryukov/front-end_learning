// • Сделайте страницу для перевода температур
// • Сделайте поле ввода для температуры в цельсиях
// • И по нажатию на кнопку, чтобы температура переводилась в шкалы цельсия и фаренгейта,
//   и результаты выводились на страницу

"use strict";
var inputSet = document.getElementsByTagName("input");
var button = document.getElementsByTagName("button");

var convertFromCelsiusToFahrenheit = function (celsius) {
    return celsius * 1.8 + 32;
};

var convertFromCelsiusToKelvin = function (celsius) {
    return +celsius + 273;
};

var roundToOneFractionDigit = function (value) {
    return value.toFixed(1);
};

button[0].addEventListener("click", function () {
    var inputValue = Number(inputSet[0].value);
    if (isNaN(inputValue)) {
        alert("Type a number...");
        // to clear all input fields
        [].forEach.call(inputSet, function (inputElement) {
            inputElement.value = "";
        });
    } else {
        document.getElementsByTagName("input")[1].value =
            roundToOneFractionDigit(convertFromCelsiusToFahrenheit(inputValue));
        document.getElementsByTagName("input")[2].value =
            roundToOneFractionDigit(convertFromCelsiusToKelvin(inputValue));
    }
});