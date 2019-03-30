// • Все библиотеки должны устанавливаться через npm
// Есть список людей с полями age, name, lastName, пусть будет около 10 человек
// • Решить при помощи underscore следующие задачи:

var persons = [{
    age: 20,
    name: "Petr",
    lastName: "Vasilyev"
}, {
    age: 15,
    name: "Leonid",
    lastName: "Petrov"
}, {
    age: 23,
    name: "Dmitry",
    lastName: "Valeriev"
}, {
    age: 12,
    name: "Alexander",
    lastName: "Nikitin"
}, {
    age: 12,
    name: "Kiril",
    lastName: "Vasilyev"
}, {
    age: 40,
    name: "Alexander",
    lastName: "Leonov"
}, {
    age: 60,
    name: "Vasilisa",
    lastName: "Leonidovna"
}, {
    age: 55,
    name: "Klim",
    lastName: "Kirilov"
}, {
    age: 43,
    name: "Kiril",
    lastName: "Emelyanov"
}, {
    age: 19,
    name: "Pavel",
    lastName: "Alexandrov"
}];

//   • Посчитать средний возраст всех людей
var sumAge = _.chain(persons)
    .pluck("age")
    .reduce(function (memo, age) {
        return memo + age;
    }, 0)
    .value();
var averageAge = sumAge / persons.length;

console.log("1) average age of all persons: " + averageAge);

//   • Получить список людей с возрастом от 20 до 30 включительно, отсортировать их по возрастанию возраста
var ageFrom20To30 = _.chain(persons)
    .filter(function (person) {
        return person.age >= 20 && person.age <= 30;
    })
    .sortBy("age")
    .value();

console.log("2) persons with age from 20 to 30: ");
_.each(ageFrom20To30, function (person) {
    console.log(_.pick(person, ["name", "lastName"]));
});

//  • Добавить всем людям поле fullName, которое состоит из фамилии и имени через пробел
_.each(persons, function (person) {
    person.fullName = person.name + " " + person.lastName;
});

console.log("3) All persons: ");
for (propName in persons) {
    console.log(persons[propName]);
}