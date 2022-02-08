# Sourcify Node.js Library

## Install
```bash
yarn add sourcify-js
```

## Constructor arguments
```javascript
constructor(serverUrl: string = 'https://sourcify.dev/server', repositoryUrl: string = 'https://repo.sourcify.dev') {
...
}
```


## Get the list of files given address and chainId
https://docs.sourcify.dev/docs/api/server/get-file-tree-all
```javascript
import SourcifyJS from 'sourcify-js';

const sourcify = new SourcifyJS()
const result = await sourcify.filesTree('0x1081Fff912072666aA8292a46B290B04c69EdbfC', 4);
```

## Verify contracts
https://docs.sourcify.dev/docs/api/#verification-api-v2---session-based
```javascript
import SourcifyJS from 'sourcify-js';
import {promises} from 'fs';

const sourcify = new SourcifyJS()
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

## Get ABI
```javascript
const sourcify = new SourcifyJS()
const {abi, name} = await sourcify.getABI('0xcdbD9188d1788AFC260785B34A005e2ABadd7868', 4);
```

## build

```yarn build```

## test

```yarn test```
