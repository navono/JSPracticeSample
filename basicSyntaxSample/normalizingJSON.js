import { normalize, schema } from 'normalizr';
import data from './sampleData.json';

// Define a usres schema
const users = new schema.Entity('users');

// Define your comments schema
const comment = new schema.Entity(
  'comment',
  {
    commenter: users
  }
);

// Define your article
const article = new schema.Entity(
  'articles',
  {
    author: users,
    comments: [ comment ]
  }
);

const normalizedData = normalize(data, article);
console.log(normalizedData);

function changeAgeAndRef(person) {
  person.age = 27;
  person = {
    name: 'John',
    age: 50
  };

  return person;
}

let person1 = {
  name: 'ping',
  age: 21
}

let person2 = changeAgeAndRef(person1);
console.log(person1);
console.log(person2);

// {
//   result: "123",
//   entities: {
//     "articles": { 
//       "123": { 
//         id: "123",
//         author: "1",
//         title: "My awesome blog post",
//         comments: [ "324" ]
//       }
//     },
//     "users": {
//       "1": { "id": "1", "name": "Paul" },
//       "2": { "id": "2", "name": "Nicole" }
//     },
//     "comments": {
//       "324": { id: "324", "commenter": "2" }
//     }
//   }
// }
