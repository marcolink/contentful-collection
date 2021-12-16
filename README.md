# (get) Contentful Collection

[![Version](https://img.shields.io/npm/v/contentful-collection.svg)](https://npmjs.org/package/contentful-collection)
[![Downloads/week](https://img.shields.io/npm/dw/contentful-collection.svg)](https://npmjs.org/package/contentful-collection)
[![License](https://img.shields.io/npm/l/contentful-collection.svg)](https://github.com/marcolink/contentful-collection/blob/master/package.json)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

Get all pages of any contentful collection

### Install 
**yarn**
```
yarn add contentful-collection
```
**npm**
```
npm i contentful-collection
```

### Usage

Query entries with `contentful.js`
```js
import contentful from "contentful";
import getContentfulCollection from "contentful-collection";

const client = contentful.createClient({
  space: "<space>",
  accessToken: "<token>"
});

const query = {content_type: "<my-content-type>"};
const allItems = await getContentfulCollection(query => client.getEntries(query), query)
```
