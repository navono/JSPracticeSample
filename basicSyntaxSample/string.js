const passthru = (literals, ...substitutions) => {
  let result = '';

  for (let i = 0; i < substitutions.length; i++) {
    result += literals[i];
    result += substitutions[i];
  }

  result += literals[literals.length - 1];
  return result;
}

let count = 10,
  price = 0.25,
  message = passthru`${count} items cost $${(count * price).toFixed(2)}`;
console.log(message);