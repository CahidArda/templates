import { throwIfMissing } from './utils.js';
import { getIndex, getRecommendedProducts, insertTestData } from './upstash.js';

/**
 * Global index connection. Reused between executions
 */
let index;

export default async ({ req, res }) => {
  throwIfMissing(process.env, [
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',
  ]);

  if (req.method !== 'GET') {
    return res.text('Not found.', 404);
  }

  if (!index) {
    index = await getIndex();
  }

  await insertTestData(index);

  const product = 'wireless earbuds for running';
  const recommended = await getRecommendedProducts(index, product);

  return res.json(recommended);
};
