import * as renderer from 'react-test-renderer';

import Hexagon from '../src/hexagon';
import TrackToCenter from '../src/track_to_center';

describe('TrackToCenter', () => {
  const hexagon: Hexagon = new Hexagon('east-west');

  describe('#toString()', () => {
    it('returns the svg path for the track to position 3', () => {
      expect(
        renderer.create(new TrackToCenter(3, hexagon).element())
      ).toMatchSnapshot();
    });

    it('returns the svg path for the track to position 1', () => {
      expect(
        renderer.create(new TrackToCenter(1, hexagon).element())
      ).toMatchSnapshot();
    });

    describe('narrow gague track', () => {
      it('matches the snapshot', () => {
        expect(
          renderer.create(new TrackToCenter(1, hexagon, 'narrow').element())
        ).toMatchSnapshot();
      });
    });

    describe('dual gague track', () => {
      it('matches the snapshot', () => {
        expect(
          renderer.create(new TrackToCenter(1, hexagon, 'dual').element())
        ).toMatchSnapshot();
      });
    });
  });
});
