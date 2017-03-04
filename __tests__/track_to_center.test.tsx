import Hexagon from '../src/hexagon';
import Point from '../src/point';
import TrackToCenter from '../src/track_to_center';

describe('TrackToCenter', () => {
  const hexagon: Hexagon = new Hexagon('east-west');

  describe('#toString()', () => {
    it('returns the svg path for the track to position 3', () => {
      expect(new TrackToCenter(3, hexagon).toString()).toMatchSnapshot();
    });

    it('returns the svg path for the track to position 1', () => {
      expect(new TrackToCenter(1, hexagon).toString()).toMatchSnapshot();
    });
  });
});
