# json-format-safely

### Browser

Example

```html
<script src="https://npmcdn.com/json-format-safely@1.0.0/index.js"></script>
<script>
let result = jsonFormatSafely('[12345678901234567890]');
console.log(result);
</script>
```

Output

```text
[
  12345678901234567890
]
```


### Node

Install

```bash
npm install json-format-safely
```

Example

```js
const jsonFormatSafely = require('json-format-safely');
let result = jsonFormatSafely('[12345678901234567890]');
console.log(result);
```

Output

```text
[
  12345678901234567890
]
```


### CLI

Install with global

```bash
npm install json-format-safely -g
```

Example

```bash
echo '[12345678901234567890]' | json-format-safely
```

Output

```text
[
  12345678901234567890
]
```
