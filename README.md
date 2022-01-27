# Sourcify Node.js Library

## Install
```bash
yarn add sourcify-js
```

## Get the list of files given address and chainId
https://sourcifyeth.github.io/docs/api/server/get-file-tree-all
```javascript
import SourcifyJS from 'sourcify-js';

const sourcify = new SourcifyJS('https://staging.sourcify.dev')
const result = await sourcify.filesTree('0x1081Fff912072666aA8292a46B290B04c69EdbfC', 4);
```

## Verify contracts
https://sourcifyeth.github.io/docs/api/#verification-api-v2---session-based
```javascript
import SourcifyJS from 'sourcify-js';
import {promises} from 'fs';

const sourcify = new SourcifyJS('https://staging.sourcify.dev')
const buffer = await promises.readFile(`artifacts/build-info/5db050a66d1a3d56db16d1fa718d837e.json`)
const result = await sourcify.verify(
    4, // chian Id
    [
        {
            name: 'Diamond',
            address: '0xcdbD9188d1788AFC260785B34A005e2ABadd7868'
        }
    ], // contracts to verify
    buffer // file containing sources and metadata
)
```

## build

```yarn build```

## test

```yarn test```
