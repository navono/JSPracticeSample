//**************************************************************************** */
// Object Destructuring
let node = {
  type: 'Identifier',
  name: 'foo',
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 1,
      column: 4
    }
  }
};

let type = 'Literal';
let name = 5;

function outputInfo(value) {
  console.log(value === node);
}

let { loc: { start } } = node;

outputInfo({type, name} = node);
// console.log(start.line);
// console.log(start.column);


//**************************************************************************** */
// Array Destructuring
let colors = [ 'red', 'green', 'blue' ];
let [ firstColor, secondColor ] = colors;
let [ , , thirdColor ] = colors;
// console.log(firstColor); // "red"
// console.log(secondColor); // "green"
// console.log(thirdColor); // "blue"


// 交换
let a = 1, b = 2;
[a, b] = [b, a];
// console.log(a);
// console.log(b);

// Rest items
let [ firstColor2, ...restColors ] = colors;
console.log(restColors.length);

// clone
let [...clonedColors] = colors;

//**************************************************************************** */
// Mixed Destructuring
// too simple

//**************************************************************************** */
// Destructured Parameters

