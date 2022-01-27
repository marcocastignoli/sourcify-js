import SourcifyJS from '../src/index';
import { expect } from 'chai';
import {promises} from 'fs';

describe('Get file tree', () => {
  it('should return eturns repository URLs for every file in the source tree for the desired chain and address', async () => {
    const sourcify = new SourcifyJS('https://staging.sourcify.dev')
    const result = await sourcify.filesTree('0x1081Fff912072666aA8292a46B290B04c69EdbfC', 4);
    expect(result['status']).to.equal('full');
  });
  it('should upload file and retrieve using session', async () => {
    const sourcify = new SourcifyJS('https://staging.sourcify.dev')
    const buffer = await promises.readFile(`test/meta_test1.json`)

    await sourcify.inputFiles(buffer)

    const result = await sourcify.sessionData()
    expect(result['contracts'].length).to.above(0)
  })
});