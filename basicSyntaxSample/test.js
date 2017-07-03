/*
 * @Author: Ping Qixing
 * @Date: 2017-06-27 13:01:36
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-28 14:42:22
 * @Description
 */

// import _ from 'lodash';

console.log('test');

let originalTicket = {
  company: 'Dalta',
  flightNo: '0990',
  departure: {
    airport: 'LAS',
    time: '2017-08-21'
  },
  arrival: {
    airport: 'MIA',
    time: '2017-08-22'
  },
  codeshare: [
    {company: 'GL', flightNo: '9840'},
    {company: 'TM', flightNo: '5010'}
  ]
}

console.log(originalTicket);

let createNewTicket = (ticket, flightNo) => ({
  ...ticket,
  flightNo: flightNo
});

// let newTicket = createNewTicket(originalTicket, '5690');
// newTicket.arrival.airport = 'MCO';
// console.log(newTicket);

let createNewTicket2 = (ticket, flightNo) => {
  let copy = _.cloneDeep(ticket);
  return {...copy, flightNo};
};
let newTicket2 = createNewTicket2(originalTicket, '8899');
newTicket2.arrival.airport = 'ABC';
console.log(newTicket2);

// let newTicket = Object.assign({}, originalTicket, {flightNo: '5690'});
// newTicket.arrival.airport = 'MCO';

// let newTicket3 = React.cloneWithProps(originalTicket,
//   {arrival: {airport: {$set: 'MCO'}}});
// console.log(newTicket3);

// const compose = (...fns) =>
//   (arg) => fns.reduce((composed, fn) => fn(composed), arg);
