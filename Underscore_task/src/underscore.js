// • Все библиотеки должны устанавливаться через npm
// Есть список людей с полями age, name, lastName, пусть будет около 10 человек
// • Решить при помощи underscore следующие задачи:

var persons = [];

persons[0] = {
    age: 20,
    name: "Petr",
    lastName: "Vasilyev"
};

persons[1] = {
    age: 15,
    name: "Leonid",
    lastName: "Petrov"
};

persons[2] = {
    age: 23,
    name: "Dmitry",
    lastName: "Valeriev"
};

persons[3] = {
    age: 12,
    name: "Alexander",
    lastName: "Nikitin"
};

persons[4] = {
    age: 12,
    name: "Kiril",
    lastName: "Vasilyev"
};

persons[5] = {
    age: 40,
    name: "Alexander",
    lastName: "Leonov"
};

persons[6] = {
    age: 60,
    name: "Vasilisa",
    lastName: "Leonidovna"
};

persons[7] = {
    age: 55,
    name: "Klim",
    lastName: "Kirilov"
};

persons[8] = {
    age: 43,
    name: "Kiril",
    lastName: "Emelyanov"
};

persons[9] = {
    age: 19,
    name: "Pavel",
    lastName: "Alexandrov"
};

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
    .filter(function (p) {
        return p.age >= 20 && p.age <= 30;
    })
    .sortBy()
    .map(function (person) {
        return {firstName: person.name, surname: person.lastName};
    })
    .value();

console.log("2) persons with age from 20 to 30: ");
ageFrom20To30.forEach(function (person) {
    console.log(person);
});

//  • Добавить всем людям поле fullName, которое состоит из фамилии и имени через пробел
_.chain(persons)
    .map(function (person) {
        person.fullName = person.name + " " + person.lastName;
    })
    .value();

console.log("3) All persons: ");
for (var propName in persons) {
    console.log(persons[propName]);
}