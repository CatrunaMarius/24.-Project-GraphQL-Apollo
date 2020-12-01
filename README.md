# 24. Project GraphQL + Apollo

## Referince link
[GraphQl](https://graphql.org/)

[Basic GraphQL types](https://graphql.org/graphql-js/basic-types/)

[Apollo docs](https://www.apollographql.com/docs/react/)

[apollo-boost npm](https://www.npmjs.com/package/apollo-boost)

[react-apollo npm](https://www.npmjs.com/package/react-apollo)

[graphql npm](https://www.npmjs.com/package/graphql)

[Import default as alias](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Importing_defaults)

[Apollo cache](https://www.apollographql.com/docs/react/caching/cache-configuration/)

[Resources Mutations](https://www.apollographql.com/docs/react/data/mutations/)


## GraphQL
When we talk about GraphQL, it usually comes with two components: The frontend part and the backend part. As React developers, we will usually only concern ourselves with the frontend implementation of GraphQL and this is what we will be exploring over the coming videos. However, for those curious on how to best build a GraphQL server, we have provided for you the backend code that we use for this course, as well as the list of some popular options out there for building such a server:

[Prism]a(https://www.prisma.io/)

[Hasura](https://hasura.io/)

[Apollo Server](https://www.apollographql.com/docs/apollo-server/)

Quick way to build a GraphQL server: (graphql-yoga)[https://github.com/prisma-labs/graphql-yoga]

(A quick step by step guide on how to set up your own GraphQL server)[https://www.apollographql.com/blog/tutorial-building-a-graphql-server-cddaa023c035/]

## Note Compose
Hello everyone! In the next lesson, we are going to use a method called compose that we import from 'react-apollo'. Unfortunately with the recent React-Apollo update to v3.0.0 it's been removed from React-Apollo and is no longer something we can import from this library. Luckily compose was just a copy of lodash's flowRight. Lodash is just a small library that gives us access to a bunch of helper functions, of which flowRight is one of! In the following lesson, anyplace you see compose just use lodash flowRight!

You can install lodash in your project by adding it as a dependency as follows:

If you're using yarn:

yarn add lodash

If you're using npm:

npm install lodash

You can then import flowRight into your file like so:

import { flowRight } from 'lodash';
and just replace any place in the lesson where we use compose with flowRight:

export default compose(
  //...code 
)(CollectionItemContainer);
becomes

export default flowRight(
  // ...code
)(CollectionItemContainer);
You can find out more about this breaking change here as well: https://github.com/apollographql/react-apollo/issues/3330.