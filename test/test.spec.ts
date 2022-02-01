import SourcifyJS from '../src/index';
import { expect } from 'chai';
import {promises} from 'fs';

describe('Test sourficy-js', () => {
  it('should return eturns repository URLs for every file in the source tree for the desired chain and address', async () => {
    const sourcify = new SourcifyJS()
    const result = await sourcify.filesTree('0xcdbD9188d1788AFC260785B34A005e2ABadd7868', 4);
    expect(result['status']).to.equal('full');
  });
  it('should upload file and retrieve using session', async () => {
    const sourcify = new SourcifyJS()
    const buffer = await promises.readFile(`test/meta_test1.json`)

    await sourcify.inputFiles(buffer)

    const result = await sourcify.sessionData()
    expect(result['contracts'].length).to.above(0)
  })
  it('should verify contracts', async () => {
    const sourcify = new SourcifyJS()
    const buffer = await promises.readFile(`test/meta_test1.json`)

    const result = await sourcify.verify(4, [
      {
        name: 'Diamond',
        address: '0xcdbD9188d1788AFC260785B34A005e2ABadd7868'
      }
    ],
    buffer)

    const diamondContract = result.contracts.find(c => {
      return c.name === 'Diamond'
    })
    expect(diamondContract.status).to.be.eq('perfect')
  })
  it('should return the ABI', async () => {
    const sourcify = new SourcifyJS()
    const result = await sourcify.getABI('0xcdbD9188d1788AFC260785B34A005e2ABadd7868', 4);
    expect(result[0].type).to.be.eq('constructor')
  });
});