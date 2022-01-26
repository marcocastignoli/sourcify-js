# Sourcify NodeJS Library

## Install
```yarn add sourcify-js```

## Get the list of files given address and chainId
https://sourcifyeth.github.io/docs/api/server/get-file-tree-all
```javascript
import { filesTree } from 'sourcify-js';
const result = await filesTree('0x1081Fff912072666aA8292a46B290B04c69EdbfC', 4); // contract_address, chainId
```

## build

```yarn build```

## test

```yarn test```
