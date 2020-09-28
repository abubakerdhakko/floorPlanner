import { ElementsFactories } from 'react-planner';

const info = {
  title: 'SQ wall',
  tag: ['SQwall'],
  description: 'Wall with bricks or painted',
  image: require('./6.png'),
  visibility: {
    catalog: true,
    layerElementsVisible: true
  }
};

const textures = {
  bricks: {
    name: 'Bricks',
    uri: require('./textures/bricks.jpg'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: require('./textures/bricks-normal.jpg'),
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.8,
      normalScaleY: 0.8
    }
  },
  painted: {
    name: 'Painted',
    uri: require('./textures/painted.jpg'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: require('./textures/painted-normal.jpg'),
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  },
};

export default ElementsFactories.WallSQFactory('SQwall', info, textures);

