import { filesTree } from '../src/lib';
import { expect } from 'chai';

describe('Get file tree', () => {
  it('should return eturns repository URLs for every file in the source tree for the desired chain and address', async () => {
    const result = await filesTree('0x1081Fff912072666aA8292a46B290B04c69EdbfC', 4);
    expect(result['status']).to.equal('full');
  });
});