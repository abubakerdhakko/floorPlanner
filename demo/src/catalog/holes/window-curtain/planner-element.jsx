import React from 'react';
import * as Three from 'three';
import { loadObjWithMaterial } from '../../utils/load-obj';
import path from 'path';

let cached3DWindow = null;

const STYLE_HOLE_BASE = { stroke: '#000', strokeWidth: '3px', fill: '#000' };
const STYLE_HOLE_SELECTED = { stroke: '#0096fd', strokeWidth: '3px', fill: '#0096fd', cursor: 'move' };
const EPSILON = 3;

export default {
  name: 'window-curtain',
  prototype: 'holes',

  info: {
    tag: ['Finestre'],
    title: 'Curtain window',
    description: 'Curtain window',
    image: require('./4.png')
  },

  properties: {
    width: {
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 90
      }
    },
    height: {
      label: 'height',
      type: 'length-measure',
      defaultValue: {
        length: 100
      }
    },
    altitude: {
      label: 'altitudine',
      type: 'length-measure',
      defaultValue: {
        length: 90
      }
    },
    thickness: {
      label: 'spessore',
      type: 'length-measure',
      defaultValue: {
        length: 10
      }
    },
    flip_horizontal: {
      label: 'flip',
      type: 'checkbox',
      defaultValue: false,
      values: {
        'none': false,
        'yes': true
      }
    }
  },

  render2D: function (element, layer, scene) {


    let flip = element.properties.get('flip_horizontal');

    let holeWidth = element.properties.get('width').get('length');
    let holePath = `M${0} ${-EPSILON}  L${holeWidth} ${-EPSILON}  L${holeWidth} ${EPSILON}  L${0} ${EPSILON}  z`;
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let length = element.properties.get('width').get('length');



    if (flip) {
      return (
        <g
          // xmlns="http://www.w3.org/2000/svg"
          // version="1.0"
          // width={holeWidth}
          // height={length}
          // fill="red"
          // viewBox="0 8 24.000000 9.000000"
          transform={`translate(${-length / 2}, 1)`}
        // preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(30,-18.000000) scale(0.2,0.3) rotate(360)"
            // transform={`translate(${-length / 2}, 9.000000) `}
            style={holeStyle}
          >
            <path
              d="M6 81 c-4 -5 -2 -12 3 -15 5 -4 12 -2 15 3 4 5 2 12 -3 15 -5 4 -12 2 -15 -3z"
              style={holeStyle}
            />
            <path
              d="M206 81 c-4 -5 -2 -12 3 -15 5 -4 12 -2 15 3 4 5 2 12 -3 15 -5 4 -12 2 -15 -3z"
              style={holeStyle}
            />
            <path
              d="M55 20 c-9 -15 16 -22 70 -18 28 2 50 8 53 16 2 6 -3 12 -12 12 -9 0 -16 -4 -16 -10 0 -5 -16 -10 -35 -10 -19 0 -35 5 -35 10 0 13 -17 13 -25 0z"
              style={holeStyle}
            />
          </g>
        </g>
      )
    }
    else {
      return (
        <g
          // xmlns="http://www.w3.org/2000/svg"
          // version="1.0"
          // width={holeWidth}
          // height={length}
          // fill="red"
          // viewBox="0 8 24.000000 9.000000"
          transform={`translate(${-length / 2}, 1)`}
        // preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(60,9.000000) scale(0.2,0.3) rotate(180)"
            // transform={`translate(${-length / 2}, 9.000000) `}
            style={holeStyle}
          >
            <path
              d="M6 81 c-4 -5 -2 -12 3 -15 5 -4 12 -2 15 3 4 5 2 12 -3 15 -5 4 -12 2 -15 -3z"
              style={holeStyle}
            />
            <path
              d="M206 81 c-4 -5 -2 -12 3 -15 5 -4 12 -2 15 3 4 5 2 12 -3 15 -5 4 -12 2 -15 -3z"
              style={holeStyle}
            />
            <path
              d="M55 20 c-9 -15 16 -22 70 -18 28 2 50 8 53 16 2 6 -3 12 -12 12 -9 0 -16 -4 -16 -10 0 -5 -16 -10 -35 -10 -19 0 -35 5 -35 10 0 13 -17 13 -25 0z"
              style={holeStyle}
            />
          </g>
        </g>
      )
    }




  },

  render3D: function (element, layer, scene) {

    let width = element.properties.get('width').get('length');
    let height = element.properties.get('height').get('length');
    let thickness = element.properties.get('thickness').get('length');
    let flip = element.properties.get('flip');

    let onLoadItem = (object) => {

      let window = new Three.Object3D();

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
        thickness / 2 / initialThickness);

      window.add(object);
      window.add(createTenda());

      if (flip === true)
        window.rotation.y += Math.PI;

      return window;
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
        return onLoadItem(cached3DWindow.clone());
      });

    function createTenda() {

      let radialWave = function (u, v) {
        let r = 10;
        let x = Math.sin(u) * 3 * r;
        let z = Math.sin(v / 2) * 2 * r;
        let y = (Math.sin(u * 2 * Math.PI) + Math.cos(v * 2 * Math.PI)) * .5;

        return new Three.Vector3(x, y, z);
      };

      //color
      let white = new Three.MeshLambertMaterial({ color: 0xeae6ca });

      let Tenda = new Three.Object3D();

      let mesh = createMesh(new Three.ParametricGeometry(radialWave, 20, 20));
      mesh.rotation.x += Math.PI / 2;
      mesh.rotation.y += Math.PI / 2;
      mesh.position.y += 3.1;
      mesh.position.x += .05;
      mesh.scale.set(.125, .125, .125);

      let mesh2 = mesh.clone();
      mesh2.rotation.x += Math.PI;
      mesh2.position.set(1.4, 0, 0.06);

      Tenda.add(mesh);
      Tenda.add(mesh2);

      for (let i = -.7; i > -3.4; i -= .45) {
        let geometry = new Three.TorusGeometry(.08, .016, 32, 32, 2 * Math.PI);
        let torus = new Three.Mesh(geometry, white);

        if (i == -1.15)
          torus.position.set(i, 3.14, .045);
        else if (i == -2.5)
          torus.position.set(i, 3.14, -.01);
        else
          torus.position.set(i, 3.14, .04);
        torus.rotation.y += Math.PI / 2;
        Tenda.add(torus);
      }

      let geometryAsta = new Three.CylinderGeometry(0.02, 0.02, 1.25, 32);
      let asta = new Three.Mesh(geometryAsta, white);
      asta.position.set(-1.1, 3.18, 0.02);
      asta.rotation.z += Math.PI / 2;
      Tenda.add(asta);

      let asta2 = asta.clone();
      asta2.position.set(-2.5, 3.18, 0.02);
      Tenda.add(asta2);

      let geometrySphereUp = new Three.SphereGeometry(0.04, 32, 32);
      let sphere = new Three.Mesh(geometrySphereUp, white);
      sphere.position.set(-.5, 3.18, 0.02);
      sphere.rotation.x += Math.PI / 2;
      sphere.scale.set(0.8, 1, 1);
      Tenda.add(sphere);

      let sphere2 = sphere.clone();
      sphere2.position.x += -1.2;
      Tenda.add(sphere2);

      let sphere3 = sphere.clone();
      sphere3.position.x += -1.4;
      Tenda.add(sphere3);

      let sphere4 = sphere.clone();
      sphere4.position.x += -2.6;
      Tenda.add(sphere4);

      let valueObject = new Three.Box3().setFromObject(Tenda);

      let deltaX = Math.abs(valueObject.max.x - valueObject.min.x);
      let deltaY = Math.abs(valueObject.max.y - valueObject.min.y);
      let deltaZ = Math.abs(valueObject.max.z - valueObject.min.z);

      Tenda.position.x += width / 1.48;
      Tenda.position.y += -height / 2.1;
      Tenda.position.z += thickness / 1024;
      Tenda.scale.set(width / deltaX, height / deltaY, thickness / deltaZ);

      return Tenda;
    }

    function createMesh(geom) {
      geom.applyMatrix(new Three.Matrix4().makeTranslation(-25, 0, -25));
      let meshMaterial = new Three.MeshLambertMaterial({ color: 0xffffff, opacity: 0.9, transparent: true });
      meshMaterial.side = Three.DoubleSide;

      let plane = new Three.Mesh(geom, meshMaterial);
      return plane;
    }

  }

};
