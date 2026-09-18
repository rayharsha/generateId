# generateid

A lightweight and configurable unique ID generator for Node.js.

`generateid` generates random IDs using a configurable character set and length. A validation callback allows the consuming application to determine whether a generated ID is available before it is returned.

## Installation

```bash
npm install @harsha-ray/generateid
```

## Usage

```js
import { GenerateId } from "@harsha-ray/generateid";

const generator = new GenerateId();

const id = generator.generate(() => true);

console.log(id);
```

Example output:

```text
aK8xP2qL
```

## Custom Configuration

You can configure the generated ID length, character set, and maximum number of generation attempts.

```js
import { GenerateId } from "@harsha-ray/generateid";

const generator = new GenerateId({
    length: 12,
    chars: "abcdefghijklmnopqrstuvwxyz0123456789",
    maxAttempts: 1000,
});

const id = generator.generate(() => true);

console.log(id);
```

## Validating IDs

The `generate()` method accepts a validation callback.

The callback receives each generated candidate ID and must return:

* `true` — accept the generated ID.
* `false` — reject the generated ID and generate another candidate.

For example, an application can check whether an ID already exists before accepting it:

```js
import { GenerateId } from "@harsha-ray/generateid";

const database = [
    "cb",
    "bb",
];

const generator = new GenerateId({
    length: 2,
    chars: "cb",
});

const id = generator.generate((candidate) => {
    return !database.includes(candidate);
});

console.log(id);
```

The library generates candidate IDs, while the consuming application is responsible for determining whether a candidate is already in use.

## Options

### `length`

**Type:** `number`
**Default:** `8`

The length of the generated ID.

```js
const generator = new GenerateId({
    length: 10,
});
```

### `chars`

**Type:** `string`

**Default:**

```text
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
```

The characters that can be used to generate the ID.

```js
const generator = new GenerateId({
    chars: "ABC123",
});
```

### `maxAttempts`

**Type:** `number`
**Default:** `1000`

The maximum number of generation attempts before an error is thrown.

```js
const generator = new GenerateId({
    maxAttempts: 500,
});
```

## Errors

The constructor throws a `TypeError` when an invalid option is provided.

The `generate()` method throws a `TypeError` when the validation callback is missing or invalid.

If no acceptable ID is generated within `maxAttempts`, an error is thrown.

## Requirements

* Node.js 18 or higher

## License

MIT
