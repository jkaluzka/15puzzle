import {shuffle} from '../views/utils';

describe('Utils', () => {
  it('shuffle array inplace', () => {
    let array = [1, 2, 3, 4];
    let _array = array.map(e => e);
    shuffle(array);
    expect(JSON.stringify(array) === JSON.stringify(_array)).toBe(false);
  });
});
