import Point from '../src/point';

describe('Point', () => {
  describe ('#toString()', () => {
    it('returns the x and y coordinates separated by a comma', () => {
      expect(new Point(1, 2).toString()).toEqual('1,2');
    });
  });
});
