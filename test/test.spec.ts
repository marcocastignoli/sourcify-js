import { multiply } from '../src/lib';
import { expect } from 'chai';

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = multiply(3,2);
    expect(result).to.equal(6);
  });
});