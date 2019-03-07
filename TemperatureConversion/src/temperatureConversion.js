// • Сделайте страницу для перевода температур
// • Сделайте поле ввода для температуры в цельсиях
// • И по нажатию на кнопку, чтобы температура переводилась в шкалы кельвина и фаренгейта,
//   и результаты выводились на страницу

"use strict";

function convertFromCelsiusToFahrenheit(celsius) {
    return celsius * 1.8 + 32;
}

function convertFromCelsiusToKelvin(celsius) {
    return +celsius + 273.15;
}

function roundToTwoFractionDigits(value) {
    return value.toFixed(2);
}

function readyDOM() {
    var convertButton = document.getElementById("conversion-button");
    convertButton.addEventListener("click", function () {
        var celsiusInput = document.getElementById("celsius");
        var inputValue = Number(celsiusInput.value);

        if (isNaN(inputValue)) {
            alert("Type a number...");
            // to clear all input fields
            var inputSet = document.getElementsByClassName("conversion-field");
            [].forEach.call(inputSet, function (inputElement) {
                inputElement.value = "";
            });

        } else {
            document.getElementById("fahrenheit").value =
                roundToTwoFractionDigits(convertFromCelsiusToFahrenheit(inputValue));
            document.getElementById("kelvin").value =
                roundToTwoFractionDigits(convertFromCelsiusToKelvin(inputValue));
        }
    });
}

document.addEventListener("DOMContentLoaded", readyDOM);