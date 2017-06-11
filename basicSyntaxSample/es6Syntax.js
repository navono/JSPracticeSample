/*
 * @Author: Ping Qixing
 * @Date: 2017-06-11 10:46:56
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-11 20:56:29
 */

// Arrow function and template string
let loardify = firstname => `${firstname} of Canterbury`;
// test code
// console.log(loardify('Ping', 'Qixing'));

let tahoe = {
    resorts: ['Kirkwood', 'Squaw', 'Alpine', 'Heavenly', 'Northstar'],

    // because in this case, this means window object
    print: function (delay = 1000) {
        setTimeout(function () {
            console.log(this.resorts.join(','))
        }, delay);
    },

    // use arrow function to protect the scope of this
    print2: function (delay = 1000) {
        setTimeout(() => {
            console.log(this.resorts.join(','))
        }, delay);
    },

    // join not defined.
    // arrow function do not block off the scope of this
    print3: (delay = 1000) => {
        setTimeout(() => {
            console.log(this.resorts.join(','))
        }, delay);
    },

    // verify above assumption
    verifyWithNormaFunc: function (delay = 1000) {
        setTimeout(function () {
            console.log(this === window);   // true
        })
    },

    verifyWithInnerArrowFunc: function (delay = 1000) {
        setTimeout(() => {
            console.log(this === window);   // false
        })
    },

    verifyWithDoubleArrowFunc: (delay = 1000) => {
        setTimeout(() => {
            console.log(this === window);   // true
        })
    }
}
// test code
// tahoe.verifyWithDoubleArrowFunc();

// Destructuring Assignment
let sandwith = {
    bread: 'dutch crunch',
    meat: 'tuna',
    cheese: 'swiss',
    toppings: ['lettuce', 'tomato', 'mustard']
}

let {bread, meat} = sandwith;
// console.log(bread, meat);

bread = 'garlic';
meat = 'turkey';

// console.log(bread);
// console.log(meat);
// console.log(sandwith.bread, sandwith.meat);

// destructure incoming function arguments
let loardify2 = ({firstname}) => {
    console.log(`${firstname} of canterbury`);
}

let regularPerson = {
    firstname: 'Qixing',
    lastname: 'Ping'
}

// loardify2(regularPerson);

// destructure from array
let [, , thirdResort] = ['Kirkwood', 'Squaw', 'Alpine', 'Heavenly', 'Northstar'];
// console.log(thirdResort);

// Object literal enhancement. the opposite of destructuring
let name = 'ping';
let elevation = 9876;
// name and elevation is the keys of the funHike object
let funHike = {name, elevation};
// console.log(funHike);

let print4 = function () {
    console.log(`Mt. ${this.name} is ${this.elevation} feet tall`)
};
let funHike2 = {name, elevation, print4}

// funHike2.print4();

let sound = 'no';
// OLD
// var skier = {
//     name: name,
//     sound: sound,
//     powderYell: function () {
//         var yell = this.sound.toUpperCase()
//         console.log(`${yell} ${yell} ${yell}!!!`)
//     },
//     speed: function (mph) {
//         this.speed = mph
//         console.log('speed:', mph)
//     }
// }

// NEW
// pull global variables into object and reduces typing by
// making the function keyword unnecessary

const skier = {
    name,
    sound,
    powderYell () {
        let yell = this.sound.toUpperCase()
        console.log(`${yell} ${yell} ${yell}!!!`)
    },
    speed (mph) {
        this.speed = mph
        console.log('speed:', mph)
    }
}

// Spread Operator
let peaks = ['Tallac', 'Ralston', 'Rose'];
let canyons = ['Ward', 'Blackwood'];
let tahoe2 = [...peaks, ...canyons];

// console.log(tahoe2.join(', '));

// imagine we wanted to grad the last item
// let [last] = peaks.reverse();   // also reverse the original object, BAD!

let [last] = [...peaks].reverse();  // the peaks array is still intact, GOOD!
// console.log(last);
// console.log(peaks);

// use spread operator to operat array
let lakes = ['Donner', 'Marlette', 'Fallen Leaf', 'Cascade'];
let [first, ...rest] = lakes;
// console.log(rest.join(', '));

// use spread operator for function args
function directions (...args) {
    let [start, ...remainin] = args;
    let [finish, ...stops] = remainin.reverse();

    console.log(`drive through ${args.length} towns`)
    console.log(`start in ${start}`)
    console.log(`the destination is ${finish}`)
    console.log(`stopping ${stops.length} times in between`)
}

// directions(
//     'Truckee',
//     'Tahoe City',
//     'Sunnyside',
//     'Homewood',
//     'Tahoma'
// )

let morning = {
    breakfast: 'oatmeal',
    lunch: 'peanut butter and jelly'
}
let dinner = 'mac and cheese';

let backpackingMeals = {
    // ...morning,      // ES2017
    dinner
}

// console.log(backpackingMeals);

// Promises
var promise = new Promise(function (resolve, reject) {
  // do a thing, possibly async, then…
    let a = 2;
    if (a !== 1) {
        resolve('Stuff worked!');
    } else {
        reject(Error('It broke'));
    }
});

promise.then(
    value => {
        console.log(value);
    }, err => {
    console.log(err);
}).catch(err => {
    console.log(err);
})

const getFakeMembers = count => new Promise((resolve, reject) => {
    const api = `http://api.randomuser.me/?nat=US&results=${count}`;
    const request = new XMLHttpRequest();
    request.open('GET', api);
    request.onload = () =>
        (request.status === 200) ? 
        resolve(JSON.parse(request.response).results) : 
        reject(Error(request.statusText));

    request.onerror = (err) => reject(err);
    request.send();
})

getFakeMembers(10).then(
    members => console.log(members),
    err => console.log(new Error(err))
);
