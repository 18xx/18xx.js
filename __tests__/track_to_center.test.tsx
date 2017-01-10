import Point from '../src/point';
import TrackToCenter from '../src/track_to_center';

describe('TrackToCenter', () => {
  describe('#toString()', () => {
    it('returns the svg path for the track to position 3', () => {
      expect(new TrackToCenter(3).toString()).toMatchSnapshot();
    });

    it('returns the svg path for the track to position 1', () => {
      expect(new TrackToCenter(1).toString()).toMatchSnapshot();
    });
  });
});
