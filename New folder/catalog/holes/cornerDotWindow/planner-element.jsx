import React from "react";
import * as Three from "three";
import { loadObjWithMaterial } from "../../utils/load-obj";
import path from "path";

let cached3DWindow = null;

export default {
  name: "cornerDotWindow",
  prototype: "holes",

  info: {
    tag: ["window"],
    title: "cornerDotWindow",
    description: "Corner Dot Window in the wall",
    image: require("./8.png"),
  },

  // name: 'double door',
  // prototype: 'holes',

  // info: {
  //   tag: ['door'],
  //   title: 'double door',
  //   description: 'iron door',
  //   image: require('./door_double.png')
  // },

  properties: {
    width: {
      label: "width",
      type: "length-measure",
      defaultValue: {
        length: 80,
      },
    },
    height: {
      label: "height",
      type: "length-measure",
      defaultValue: {
        length: 215,
      },
    },
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
      },
    },
    thickness: {
      label: "thickness",
      type: "length-measure",
      defaultValue: {
        length: 30,
      },
    },
  },

  render2D: function (element, layer, scene) {
    const STYLE_HOLE_BASE = {
      stroke: "#000",
      strokeWidth: "3px",
      fill: "#000",
    };
    const STYLE_HOLE_SELECTED = {
      stroke: "#0096fd",
      strokeWidth: "3px",
      fill: "#0096fd",
      cursor: "move",
    };

    let epsilon = 3;

    let holeWidth = element.properties.get("width").get("length");
    let holePath = `M${0} ${-epsilon}  L${holeWidth} ${-epsilon}  L${holeWidth} ${epsilon}  L${0} ${epsilon}  z`;
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let length = element.properties.get("width").get("length");

    return (
      <g
        xmlns="http://www.w3.org/2000/svg"
        style={holeStyle}
        viewBox="0 0 22.5 10.88"
      >
        <g
          style={holeStyle}
          id="Group_8"
          data-name="Group 8"
          transform="translate(-973.25 -613.75)"
        >
          <path
            id="Path_18"
            data-name="Path 18"
            d="M54,186.5v7.19H70V186.5h3v10.38H51V186.5Z"
            transform="translate(922.5 427.5)"
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="0.5"
          />
          <path
            id="Path_19"
            data-name="Path 19"
            d="M51,193.04h3v.65h2v3.19H51Z"
            transform="translate(922.5 427.5)"
          />
          <rect
            id="Rectangle_8"
            data-name="Rectangle 8"
            width="3.48"
            height="3.19"
            transform="translate(983.02 621.19)"
          />
          <path
            id="Path_20"
            data-name="Path 20"
            d="M68.07,193.69v3.19H73v-3.82H70v.63Z"
            transform="translate(922.5 427.5)"
          />
          <rect
            id="Rectangle_9"
            data-name="Rectangle 9"
            width="3"
            height="2"
            transform="translate(992.5 614)"
          />
          <rect
            id="Rectangle_10"
            data-name="Rectangle 10"
            width="3"
            height="2.02"
            transform="translate(973.5 614)"
          />
        </g>
      </g>
    );
  },

  render3D: function (element, layer, scene) {
    let width = element.properties.get("width").get("length");
    let height = element.properties.get("height").get("length");
    let thickness = element.properties.get("thickness").get("length");
    let flip = element.properties.get("flip");

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

      let width = element.properties.get("width").get("length");
      let height = element.properties.get("height").get("length");
      let thickness = element.properties.get("thickness").get("length");

      object.scale.set(
        width / initialWidth,
        height / initialHeight,
        thickness / 2 / initialThickness
      );

      venetian.add(object);
      venetian.add(createTenda());

      if (flip === true) venetian.rotation.y += Math.PI;

      return venetian;
    };

    if (cached3DWindow) {
      return Promise.resolve(onLoadItem(cached3DWindow.clone()));
    }

    let mtl = require("./venetian.mtl");
    let obj = require("./venetian.obj");
    let img = require("./texture.png");

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + "/").then(
      (object) => {
        cached3DWindow = object;
        return onLoadItem(cached3DWindow.clone());
      }
    );

    function createTenda() {
      var venetian = new Three.Object3D();

      //colors
      var white = new Three.MeshLambertMaterial({
        color: 0xffffff,
        opacity: 0.5,
        transparent: true,
      });
      var grey = new Three.MeshLambertMaterial({ color: 0xcccccc });

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
      roundedRectShape.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - radius
      );
      roundedRectShape.lineTo(x + width, y + radius);
      roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
      roundedRectShape.lineTo(x + radius, y);
      roundedRectShape.quadraticCurveTo(x, y, x, y + radius);

      var holePath1 = new Three.Path();
      holePath1.moveTo(0.5, 0.6);
      holePath1.arc(0, 0.7, 0.15, 0, Math.PI, false);
      holePath1.arc(0.15, -0.09, 0.15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath1);

      var holePath2 = new Three.Path();
      holePath2.moveTo(0.5, 4.6);
      holePath2.arc(0, 0.7, 0.15, 0, Math.PI, false);
      holePath2.arc(0.15, -0.09, 0.15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath2);

      var holePath3 = new Three.Path();
      holePath3.moveTo(0.5, 8.6);
      holePath3.arc(0, 0.7, 0.15, 0, Math.PI, false);
      holePath3.arc(0.15, -0.09, 0.15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath3);

      var holePath4 = new Three.Path();
      holePath4.moveTo(0.5, 12.6);
      holePath4.arc(0, 0.7, 0.15, 0, Math.PI, false);
      holePath4.arc(0.15, -0.09, 0.15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath4);

      var holePath5 = new Three.Path();
      holePath5.moveTo(0.5, 16.6);
      holePath5.arc(0, 0.7, 0.15, 0, Math.PI, false);
      holePath5.arc(0.15, -0.09, 0.15, Math.PI, 0, false);
      roundedRectShape.holes.push(holePath5);

      var extrudeSettings = {
        steps: 1,
        depth: 0.2,
        bevelEnabled: false,
        bevelThickness: 0.4,
        bevelSize: 0.4,
        bevelSegments: 1,
      };

      for (var i = 0; i < 25; i += 0.7) {
        var geometry = new Three.ExtrudeGeometry(
          roundedRectShape,
          extrudeSettings
        );
        var mesh = new Three.Mesh(geometry, grey);
        mesh.position.set(0, i, 0.86);
        mesh.rotation.z += Math.PI / 2;
        mesh.rotation.x += -Math.PI / 2;
        venetian.add(mesh);
      }

      for (var j = -1.25; j > -19; j += -4) {
        var geometry1 = new Three.CylinderGeometry(0.105, 0.105, 26, 32);
        var tubo = new Three.Mesh(geometry1, white);
        tubo.position.set(j, 12.5, 0.35);
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
      roundedRectShape2.quadraticCurveTo(
        x1,
        y1 + height1,
        x1 + radius1,
        y1 + height1
      );
      roundedRectShape2.lineTo(x1 + width1 - radius1, y1 + height1);
      roundedRectShape2.quadraticCurveTo(
        x1 + width1,
        y1 + height1,
        x1 + width1,
        y1 + height1 - radius1
      );
      roundedRectShape2.lineTo(x1 + width1, y1 + radius1);
      roundedRectShape2.quadraticCurveTo(
        x1 + width1,
        y1,
        x1 + width1 - radius1,
        y1
      );
      roundedRectShape2.lineTo(x1 + radius1, y1);
      roundedRectShape2.quadraticCurveTo(x1, y1, x1, y1 + radius1);

      var extrudeSettings2 = {
        steps: 1,
        depth: 0.4,
        bevelEnabled: false,
        bevelThickness: 0.4,
        bevelSize: 0.4,
        bevelSegments: 1,
      };

      for (var k = -0.5; k < 27; k += 26) {
        var geometry2 = new Three.ExtrudeGeometry(
          roundedRectShape2,
          extrudeSettings2
        );
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

      venetian.position.x += width1 / 0.025;
      venetian.position.y += -height1 / 0.4;
      venetian.scale.set(
        (5.2 * width1) / deltaZ,
        (5.45 * height1) / deltaY,
        (2.5 * thickness) / deltaX
      );

      return venetian;
    }
  },
};
