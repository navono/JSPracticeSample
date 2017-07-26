import { normalize, schema } from 'normalizr';
import data from './sampleData.json';

// Define a usres schema
const author = new schema.Entity('author');

// Define your comments schema
const comment = new schema.Entity(
  'comment',
  {
    commenter: author
  }
);

// Define your article
const article = new schema.Entity(
  'articles',
  {
    author: author,
    comments: [ comment ]
  }
);

const normalizedData = normalize(data, article);
console.log(normalizedData);
