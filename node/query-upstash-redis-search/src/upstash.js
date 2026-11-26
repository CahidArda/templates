import { Redis, s } from '@upstash/redis';

const redis = Redis.fromEnv();

/**
 * Creates the search index if it does not exist yet, and returns it.
 *
 * `description` is a HYBRID field: Redis Search embeds it for you, so it can
 * be searched by meaning without an embedding provider or API key.
 */
export async function getIndex() {
  return await redis.search.createIndex({
    name: 'products',
    dataType: 'json',
    prefix: 'product:',
    existsOk: true,
    schema: s.object({
      name: s.string(),
      description: s.hybrid(),
      category: s.keyword(),
      price: s.number(),
    }),
  });
}

/**
 * Insert a sample product
 */
export async function insertTestData(index) {
  const products = {
    electronics: [
      'wireless earbuds',
      'noise cancelling headphones',
      'smartwatch',
    ],
    sports: ['running shoes', 'yoga mat', 'water bottle'],
    furniture: ['standing desk', 'office chair', 'bookshelf'],
  };

  const categories = Object.keys(products);
  const category = categories[Math.floor(Math.random() * categories.length)]; // Random category
  const items = products[category];
  const item = items[Math.floor(Math.random() * items.length)]; // Random item
  const name = `Product #${Math.round(Math.random() * 1000)}`; // Random name
  const price = 10 + Math.round(Math.random() * 90); // Random number between 10 and 100

  // Generate ID as combination of time and randomness
  const id = `${new Date().getTime().toString(16)}${Math.round(Math.random() * 1000000000).toString(16)}`;

  await redis.json.set(`product:${id}`, '$', {
    name,
    description: `${item} in category ${category} priced at ${price}€`,
    category,
    price,
  });

  // Wait until the new product is searchable
  await index.waitIndexing();
}

/**
 * Find the products closest in meaning to the given text
 */
export async function getRecommendedProducts(index, product) {
  return await index.query({
    filter: { $ann: { field: 'description', query: product } },
    limit: 3,
  });
}
