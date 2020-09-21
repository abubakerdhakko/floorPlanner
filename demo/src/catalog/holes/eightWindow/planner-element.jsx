import React from 'react';
import * as Three from 'three';
import { loadObjWithMaterial } from '../../utils/load-obj';
import path from 'path';

let cached3DWindow = null;

export default {
  name: "eightWindow",
  prototype: "holes",

  info: {
    title: "eightWindow",
    tag: ['window'],
    description: "sevenWindow",
    image: require('./8.png')
  },

  properties: {
    width: {
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 200,
        unit: 'cm'
      }
    },
    height: {
      label: 'height',
      type: 'length-measure',
      defaultValue: {
        length: 215,
        unit: 'cm'
      }
    },
    thickness: {
      label: 'thickness',
      type: 'length-measure',
      defaultValue: {
        length: 30,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    flip_horizontal: {
      label: 'horizontal flip',
      type: 'checkbox',
      defaultValue: 'none',
      values: {
        'none': 'none',
        'yes': 'yes'
      }
    },
    // flip_vertical: {
    //   label: 'vertical flip',
    //   type: 'checkbox',
    //   defaultValue: 'right',
    //   values: {
    //     'right': 'right',
    //     'left': 'left'
    //   }
    // }
  },


  render2D: function (element, layer, scene) {
    const STYLE_HOLE_BASE_mid = { stroke: '#fff', strokeWidth: '10px', fill: 'none' };
    const STYLE_HOLE_BASE = { stroke: '#000', strokeWidth: '14px', fill: '#000' };
    const STYLE_HOLE_BASE2 = { stroke: '#000', strokeWidth: '16px', fill: '#000' };
    const STYLE_HOLE_SELECTED = { stroke: '#0096fd', strokeWidth: '14px', fill: '#0096fd', cursor: 'move' };

    let epsilon = 3;
    let flip = element.properties.get('flip_horizontal');
    let handleSide = element.properties.get('flip_vertical');
    let holeWidth = element.properties.get('width').get('length');
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let holeStyle2 = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE2;
    let length = element.properties.get('width').get('length');

    let scaleX, scaleY;
    let scaleX2, scaleY2;
    let pX1, pX2;

    flip ? flip = 'yes' : flip = 'none';
    handleSide ? handleSide = 'right' : handleSide = 'left';

    if (flip === 'yes') {
      scaleX = 1;
      if (handleSide === 'right') {
        pX1 = 0;
        pX2 = holeWidth / 2;
        scaleY = -1;
        console.log('first if first part')

      }
      else {
        pX1 = 20;
        pX2 = holeWidth - 20;
        scaleY = -1;
        console.log('first if else part')

      }
    }
    else {
      scaleX = 1;
      if (handleSide === 'right') {
        pX1 = holeWidth / 2;
        pX2 = holeWidth;
        scaleY = 1;
        console.log('else right ')
      }
      else {
        pX1 = 20;
        pX2 = holeWidth - 20;
        scaleY = 1;
        console.log('else else ')
      }

    }
    return (
      <g transform={`translate(${-element.properties.get('width').get('length') / 2}, 0)`}>
        <line key='1' x1='0' y1={0 - epsilon} x2={holeWidth} y2={0 - epsilon} style={holeStyle}
          transform={`scale(${scaleX},${scaleY})`} />
        <line key='2' x1={pX1} y1={- epsilon} x2={pX2} y2={- epsilon} style={STYLE_HOLE_BASE_mid}
          transform={`scale(${scaleX},${scaleY})`} />
        <line key='3' x1={holeWidth} y1={0 - epsilon} x2={holeWidth} y2={15 + epsilon} style={holeStyle2}
          transform={`scale(${scaleX},${scaleY})`} />
        <line key='4' x1='0' y1={0 - epsilon} x2='0' y2={15 + epsilon} style={holeStyle2}
          transform={`scale(${scaleX},${scaleY})`} />
      </g>
    )
  },

  render3D: function (element, layer, scene) {
    let onLoadItem = (object) => {
      let boundingBox = new Three.Box3().setFromObject(object);

      let initialWidth = boundingBox.max.x - boundingBox.min.x;
      let initialHeight = boundingBox.max.y - boundingBox.min.y;
      let initialThickness = boundingBox.max.z - boundingBox.min.z;

      if (element.selected) {
        let box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        box.renderOrder = 1000;
        object.add(box);
      }

      let width = element.properties.get('width').get('length');
      let height = element.properties.get('height').get('length');
      let thickness = element.properties.get('thickness').get('length');

      object.scale.set(width / initialWidth, height / initialHeight,
        thickness / initialThickness);

      return object;
    };

    if (cached3DWindow) {
      return Promise.resolve(onLoadItem(cached3DWindow.clone()));
    }

    let mtl = require('./window.mtl');
    let obj = require('./window.obj');
    let img = require('./texture.png');

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + '/')
      .then(object => {
        cached3DWindow = object;
        return onLoadItem(cached3DWindow.clone())
      })
  }
};
