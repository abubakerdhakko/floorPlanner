import React from 'react';
import * as Three from 'three';
import { loadObjWithMaterial } from '../../utils/load-obj';
import path from 'path';

let cached3DWindow = null;

export default {
  name: 'venetian-blind-window',
  prototype: 'holes',

  info: {
    tag: ['Window'],
    title: 'Venetian Blind Window',
    description: 'Venetian Blind Window',
    image: require('./3.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 90
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 100
      }
    },
    altitude: {
      label: 'Altitude',
      type: 'length-measure',
      defaultValue: {
        length: 90
      }
    },
    thickness: {
      label: 'Thickness',
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
    const STYLE_HOLE_BASE = { stroke: "#000", strokeWidth: "3px", fill: "#000" };
    const STYLE_HOLE_SELECTED = { stroke: "#0096fd", strokeWidth: "3px", fill: "#0096fd", cursor: "move" };
    //let line = layer.lines.get(hole.line);
    //let epsilon = line.properties.get('thickness') / 2;

    let epsilon = 3;

    let holeWidth = element.properties.get('width').get('length');
    let holePath = `M${0} ${-epsilon * 2}  L${holeWidth} ${-epsilon * 2}  L${holeWidth} ${epsilon * 2}  L${0} ${epsilon * 2}  z`;
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let length = element.properties.get('width').get('length');



    if (flip) {
      return (
        // <g transform={`translate(${-element.properties.get('width').get('length') / 2}, 0)`}>
        //   <path key='1' d={arcPath} style={arcStyle} transform={`translate(${0},${-holeWidth/2})`}/>
        //   <line key='2' x1={0}  y1={0 - epsilon} x2={0} y2={-holeWidth/2 - epsilon} style={holeStyle}/>
        //   <path key='3' d={arcPath2} style={arcStyle} transform={`translate(${holeWidth},${-holeWidth/2}) rotate(90)`}/>
        //   <line key='4' x1={holeWidth}  y1={0 - epsilon} x2={holeWidth} y2={-holeWidth/2 - epsilon} style={holeStyle}/>
        //   <path key='5' d={holePath} style={holeStyle}/>
        // </g>


        // <g style={holeStyle} xmlns="http://www.w3.org/2000/svg" width={holeWidth} height={length} viewBox="0 0 27 7" >
        //   <g style={holeStyle} id="Group_133" data-name="Group 133" transform="translate(-140.5 -162.5)  ">
        //     <g id="Group_4" data-name="Group 4" transform="translate(-831 -319)" style={holeStyle}>
        //       <path id="Path_8" data-name="Path 8" d="M72,60.5h3.5v-6h-26v6H53" transform="translate(922.5 427.5)" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="1" style={holeStyle} />
        //       <path style={holeStyle} id="Path_9" data-name="Path 9" d="M53,60.5H49.5v-6H55v3.48Z" transform="translate(922.5 427.5)" />
        //       <path style={holeStyle} id="Path_10" data-name="Path 10" d="M75.5,60.5H72l-2-2.51V54.5h5.5Z" transform="translate(922.5 427.5)" />
        //       <line style={holeStyle} id="Line_3" data-name="Line 3" x2="15" transform="translate(977.5 485)" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="1" />
        //     </g>
        //   </g>
        // </g>
        <g transform={`translate(${-length / 2}, 0)`}>
          <path key="1" d={holePath} style={holeStyle} />
          <line key="2" x1={0} y1={0} x2={0} y2={20 + epsilon} style={holeStyle} />
          <line key="3" x1={holeWidth} y1={0} x2={holeWidth} y2={20 + epsilon} style={holeStyle} />

          <line
            x1="10"
            y1={0}
            x2={holeWidth - 10}
            y2={0}
            stroke="#fff"
            strokeWidth="6"
          />
        </g>
      )
    }
    else {
      return (
        // <g transform={`translate(${-element.properties.get('width').get('length') / 2}, 0)`}>
        //   <path key='1' d={arcPath} style={arcStyle} transform={`translate(${holeWidth},${holeWidth/2}) rotate(180)`}/>
        //   <line key='2' x1={0}  y1={0 - epsilon} x2={0} y2={holeWidth/2 - epsilon} style={holeStyle}/>
        //   <path key='3' d={arcPath2} style={arcStyle} transform={`translate(${0},${holeWidth/2}) rotate(270)`}/>
        //   <line key='4' x1={holeWidth}  y1={0 - epsilon} x2={holeWidth} y2={holeWidth/2 - epsilon} style={holeStyle}/>
        //   <path key='5' d={holePath} style={holeStyle}/>
        // </g>

        // <g transform={`translate(${-length / 2}, 0)`}>
        //   <path key='1' d={holePath} style={holeStyle} />
        //   <line key='2' x1={holeWidth / 2} y1={-10 - epsilon} x2={holeWidth / 2} y2={10 + epsilon} style={holeStyle} />
        // </g>

        // <g transform={`translate(${-element.properties.get('width').get('length') / 2}, 0)`}>
        //   <g style={holeStyle} xmlns="http://www.w3.org/2000/svg" width={holeWidth * 10} height={length * 10} viewBox="0 0 27 7" >
        //     <g style={holeStyle} id="Group_133" data-name="Group 133" transform="translate(-140.5 -162.5)  ">
        //       <g id="Group_4" data-name="Group 4" transform="translate(-831 -319)" style={holeStyle}>
        //         <path id="Path_8" data-name="Path 8" d="M72,60.5h3.5v-6h-26v6H53" transform="translate(922.5 427.5)" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="1" style={holeStyle} />
        //         <path style={holeStyle} id="Path_9" data-name="Path 9" d="M53,60.5H49.5v-6H55v3.48Z" transform="translate(922.5 427.5)" />
        //         <path style={holeStyle} id="Path_10" data-name="Path 10" d="M75.5,60.5H72l-2-2.51V54.5h5.5Z" transform="translate(922.5 427.5)" />
        //         <line style={holeStyle} id="Line_3" data-name="Line 3" x2="15" transform="translate(977.5 485)" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="1" />
        //       </g>
        //     </g>
        //   </g>
        // </g>
        <g transform={`translate(${-length / 2}, 0)`}>
          <path key="1" d={holePath} style={holeStyle} />
          <line key="2" x1={0} y1={0} x2={0} y2={20 + epsilon} style={holeStyle} />
          <line key="3" x1={holeWidth} y1={0} x2={holeWidth} y2={20 + epsilon} style={holeStyle} />

          <line
            x1="10"
            y1={0}
            x2={holeWidth - 10}
            y2={0}
            stroke="#fff"
            strokeWidth="6"
          />
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

      let venetian = new Three.Object3D();

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

      venetian.add(object);
      venetian.add(createTenda());

      if (flip === true)
        venetian.rotation.y += Math.PI;

      return venetian;
    };

    if (cached3DWindow) {
      return Promise.resolve(onLoadItem(cached3DWindow.clone()));;
    }

    let mtl = require('./venetian.mtl');
    let obj = require('./venetian.obj');
    let img = require('./texture.png');

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + '/')
      .then(object => {
        cached3DWindow = object;
        return onLoadItem(cached3DWindow.clone());
      });

    function createTenda() {

      var venetian = new Three.Object3D();

      //colors
      var white = new Three.MeshLambertMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
      var grey = new Three.MeshLambertMaterial({ color: 0xCCCCCC });

      var roundedRectShape = new Three.Shape();

      var x = 0;
      var y = 0;
      var width = 1;
      var height = 18;
      var radius = 0.25;

      roundedRectShape.moveTo(x, y + radius);
      roundedRectShape.lineTo(x, y + height - radius);
      roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
      roundedRectShape.lineTo(x + width - radius, y + height);
      roundedRectShape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
      roundedRectShape.lineTo(x + width, y + radius);
      roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
      roundedRectShape.lineTo(x + radius, y);
      roundedRectShape.quadraticCurveTo(x, y, x, y + radius);

      var holePath1 = new Three.Path();
      holePath1.moveTo(0.5, 0.6);
      holePath1.arc(0, .7, .15, 0, Math.PI, false);
      holePath1.arc(0.15, -.09, .15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath1);

      var holePath2 = new Three.Path();
      holePath2.moveTo(0.5, 4.6);
      holePath2.arc(0, .7, .15, 0, Math.PI, false);
      holePath2.arc(0.15, -.09, .15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath2);

      var holePath3 = new Three.Path();
      holePath3.moveTo(0.5, 8.6);
      holePath3.arc(0, .7, .15, 0, Math.PI, false);
      holePath3.arc(0.15, -.09, .15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath3);

      var holePath4 = new Three.Path();
      holePath4.moveTo(0.5, 12.6);
      holePath4.arc(0, .7, .15, 0, Math.PI, false);
      holePath4.arc(0.15, -.09, .15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath4);

      var holePath5 = new Three.Path();
      holePath5.moveTo(0.5, 16.6);
      holePath5.arc(0, .7, .15, 0, Math.PI, false);
      holePath5.arc(0.15, -.09, .15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath5);

      var extrudeSettings = {
        steps: 1,
        depth: 0.2,
        bevelEnabled: false,
        bevelThickness: .4,
        bevelSize: .4,
        bevelSegments: 1
      };


      for (var i = 0; i < 25; i += .7) {
        var geometry = new Three.ExtrudeGeometry(roundedRectShape, extrudeSettings);
        var mesh = new Three.Mesh(geometry, grey);
        mesh.position.set(0, i, 0.86);
        mesh.rotation.z += Math.PI / 2;
        mesh.rotation.x += -Math.PI / 2;
        venetian.add(mesh);

      }

      for (var j = -1.25; j > -19; j += -4) {

        var geometry1 = new Three.CylinderGeometry(0.105, 0.105, 26, 32);
        var tubo = new Three.Mesh(geometry1, white);
        tubo.position.set(j, 12.5, .35);
        venetian.add(tubo);

      }

      var roundedRectShape2 = new Three.Shape();

      var x1 = 0;
      var y1 = 0;
      var width1 = 1;
      var height1 = 18;
      var radius1 = 0.25;

      roundedRectShape2.moveTo(x1, y1 + radius1);
      roundedRectShape2.lineTo(x1, y1 + height1 - radius1);
      roundedRectShape2.quadraticCurveTo(x1, y1 + height1, x1 + radius1, y1 + height1);
      roundedRectShape2.lineTo(x1 + width1 - radius1, y1 + height1);
      roundedRectShape2.quadraticCurveTo(x1 + width1, y1 + height1, x1 + width1, y1 + height1 - radius1);
      roundedRectShape2.lineTo(x1 + width1, y1 + radius1);
      roundedRectShape2.quadraticCurveTo(x1 + width1, y1, x1 + width1 - radius1, y1);
      roundedRectShape2.lineTo(x1 + radius1, y1);
      roundedRectShape2.quadraticCurveTo(x1, y1, x1, y1 + radius1);

      var extrudeSettings2 = {
        steps: 1,
        depth: 0.4,
        bevelEnabled: false,
        bevelThickness: .4,
        bevelSize: .4,
        bevelSegments: 1
      };


      for (var k = -.5; k < 27; k += 26) {
        var geometry2 = new Three.ExtrudeGeometry(roundedRectShape2, extrudeSettings2);
        var mesh2 = new Three.Mesh(geometry2, grey);
        mesh2.position.set(0, k, 1);
        mesh2.rotation.z += Math.PI / 2;
        mesh2.rotation.x += -Math.PI / 2;
        venetian.add(mesh2);
      }


      let valueObject = new Three.Box3().setFromObject(venetian);

      let deltaX = Math.abs(valueObject.max.x - valueObject.min.x);
      let deltaY = Math.abs(valueObject.max.y - valueObject.min.y);
      let deltaZ = Math.abs(valueObject.max.z - valueObject.min.z);

      venetian.position.x += width1 / .025;
      venetian.position.y += -height1 / .4;
      venetian.scale.set(5.2 * width1 / deltaZ, 5.45 * height1 / deltaY, 2.5 * thickness / deltaX);


      return venetian;
    }
  }

};
