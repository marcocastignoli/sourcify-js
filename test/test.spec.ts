import SourcifyJS from '../src/index';
import { expect } from 'chai';
import {promises} from 'fs';

describe('Test sourficy-js', () => {
  it('should return eturns repository URLs for every file in the source tree for the desired chain and address', async () => {
    const sourcify = new SourcifyJS('http://localhost:8990')
    const result = await sourcify.filesTree('0x5D7a8f4e0B41cB1A5870E0c6670A27503d873218', 4);
    expect(result['status']).to.equal('full');
  });
  it('should upload file and retrieve using session', async () => {
    const sourcify = new SourcifyJS('http://localhost:8990')
    const buffer = await promises.readFile(`test/meta_test1.json`)

    await sourcify.inputFiles(buffer)

    const result = await sourcify.sessionData()
    expect(result['contracts'].length).to.above(0)
  })
  it('should verify contracts', async () => {
    const sourcify = new SourcifyJS('http://localhost:8990')
    const buffer = await promises.readFile(`test/meta_test1.json`)

    const result = await sourcify.verify(4, [
      {
        name: 'Diamond',
        address: '0x01699Cca4500467c2995366B0272e7052c37f094'
      }
    ],
    buffer)

    const diamondContract = result.contracts.find(c => {
      return c.name === 'Diamond'
    })
    expect(diamondContract.status).to.be.eq('perfect')
  })
  it('should return the metadata', async () => {
    const sourcify = new SourcifyJS('http://localhost:8990', 'http://localhost:5500')
    const result = await sourcify.metadata('0x5D7a8f4e0B41cB1A5870E0c6670A27503d873218', 4);
    expect(Object.keys(result).length).to.be.greaterThan(0)
  });
  
  it('should return the ABI', async () => {
    const sourcify = new SourcifyJS('http://localhost:8990', 'http://localhost:5500')
    const {name} = await sourcify.getABI('0x5D7a8f4e0B41cB1A5870E0c6670A27503d873218', 4);
    expect(name).to.be.eq('Test1Facet')
  });
});