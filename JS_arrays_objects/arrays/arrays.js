/*
• 1) Создайте массив чисел
• Отсортируйте его по убыванию
• Получите подмассив из первых 5 элементов и подмассив из последних 5 элементов
• Найдите сумму элементов массива, которые являются четными числами
• 2) Создайте массив чисел от 1 до 100, в таком порядке
• Получите список квадратов четных чисел из этого
массива
- Результаты пусть печатаются в консоль, console.log
- Оформите код в виде функций
 */

// (1)
var intArray = [1, 10, 4, 6, -10, 0, -19, 2];
console.log("Initial array: " + intArray);

intArray.sort(function (e1, e2) {
    return e2 - e1;
});
console.log("Array sorted in descending order: " + intArray);

var first5Elements = intArray.slice(0, 5);
console.log("First 5 sorted elements: " + first5Elements);

var last5Elements = intArray.slice(intArray.length - 5, intArray.length);
console.log("Last 5 sorted elements: " + last5Elements);

function findEvenElementsSum(array) {
    var evenElementsSum = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            evenElementsSum = evenElementsSum + array[i];
        }
    }
    return evenElementsSum;
}

var arrayEvenElementsSum = findEvenElementsSum(intArray);
console.log("Sum of the even elements: " + arrayEvenElementsSum);

// (2)
function init100ConsecutiveIntegers() {
    var array = [];
    for (var i = 1; i <= 100; i++) {
        array.push(i);
    }
    return array;
}

var elements100Array = init100ConsecutiveIntegers();
console.log(elements100Array);

function createEvenIntegersSquaresList(array) {
    var evenSquaresList = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            evenSquaresList.push(array[i] * array[i]);
        }
    }
    return evenSquaresList;
}

var evenSquaresList = createEvenIntegersSquaresList(elements100Array);
console.log(evenSquaresList);