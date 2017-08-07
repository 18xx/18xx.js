import { MapDefinition } from '../../src/map_builder';

export const mapDefinition: MapDefinition = {
  companies: {
    'B&O': {
      name: 'Baltimore and Ohio Railroad',
      primaryColor: '#070A3F',
      secondaryColor: 'white',
      shorthand: 'B&O',
      textColor: 'black',
    }
  },
  costLocation: {
    b4: { x: 5, y: 35 }
  },
  dynamicValues: {
    a1: {
      values: {
        // FIXME: New Value System
        brown: 50,
        gray: 60,
        green: 30,
        yellow: 20,
      }
    }
  },
  hexes: {
    a: [1, 3],
    b: [2, 4, 6, 8]
  },
  names: {
    a1: 'One Town',
    a3: 'Threesville'
  },
  offBoards: {
    a1: {
      exits: [0, 5]
    }
  },
  orientation: 'east-west',
  preplacedTile: {
    b8: {
      color: 'gray',
      label: 'Preplaced',
      spots: 1,
      trackToCenter: [3],
      type: 'City'
    }
  },
  tileCostTypes: {
    mountain: {
      amount: 120,
      color: '#f86',
      shape: 'triangle'
    },
    river: {
      amount: 40,
      color: '#aaf',
      shape: 'square'
    }
  },
  tileCosts: {
    b2: 'river',
    b4: 'mountain'
  },
  tileManifest: {
    7: {
      count: 4,
      promotions: [18, 26, 27, 28, 29],
    },
  },
};
