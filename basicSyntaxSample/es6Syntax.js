/*
 * @Author: Ping Qixing
 * @Date: 2017-06-11 10:46:56
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-11 10:55:00
 */

// Arrow function and template string
let loardify = firstname => `${firstname} of Canterbury`;

console.log(loardify('Ping', 'Qixing'));

let tahoe = {
    resorts: ['Kirkwood', 'Squaw', 'Alpine', 'Heavenly', 'Northstar'],

    // join not defined.
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
    }
}

tahoe.print2();
