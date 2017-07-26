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
