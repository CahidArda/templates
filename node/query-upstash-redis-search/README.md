# 🔎 Node.js Query Upstash Redis Search Function

A function to store products in Upstash Redis, and search them by meaning with Redis Search.

Redis Search runs inside your Upstash Redis database and creates the embeddings for you, so you don't need a separate vector database or an embedding API key.

## 🧰 Usage

### GET /

- Save one product, then return the three products closest in meaning to `wireless earbuds for running`.

**Response**

Sample `200` Response:

```json
[
  {
    "key": "product:19a7c0f3e2b4c1d2e3",
    "score": 0.8412,
    "data": {
      "name": "Product #482",
      "description": "wireless earbuds in category electronics priced at 36€",
      "category": "electronics",
      "price": 36
    }
  }
]
```

## ⚙️ Configuration

| Setting           | Value         |
| ----------------- | ------------- |
| Runtime           | Node (18.0)   |
| Entrypoint        | `src/main.js` |
| Build Commands    | `npm install` |
| Permissions       | `any`         |
| Timeout (Seconds) | 15            |

## 🔒 Environment Variables

### UPSTASH_REDIS_REST_URL

The REST URL of your Upstash Redis database.

| Question      | Answer                                                                      |
| ------------- | --------------------------------------------------------------------------- |
| Required      | Yes                                                                         |
| Sample Value  | `https://resolved-mallard-84564.upstash.io`                                 |
| Documentation | [Upstash: Redis Search](https://upstash.com/docs/redis/search/introduction) |

### UPSTASH_REDIS_REST_TOKEN

The REST token of your Upstash Redis database.

| Question      | Answer                                                                      |
| ------------- | --------------------------------------------------------------------------- |
| Required      | Yes                                                                         |
| Sample Value  | `AX2rAAIjcDE...WMxZQ`                                                       |
| Documentation | [Upstash: Redis Search](https://upstash.com/docs/redis/search/introduction) |
