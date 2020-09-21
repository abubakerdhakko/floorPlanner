import React from "react";
import * as Three from "three";
import path from "path";

export default {
  name: "fullRectWin,",
  prototype: "holes",

  info: {
    tag: ["window"],
    title: "fullRectWin,",
    description: "fullRectWin, the wall",
    image: require("./9.png"),
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
      strokeWidth: "4px",
      fill: "#0096fd",
      cursor: "move",
    };
    const STYLE_ARC_BASE = {
      stroke: "#000",
      strokeWidth: "3px",
      strokeDasharray: "5,5",
      fill: "none",
    };
    const STYLE_ARC_SELECTED = {
      stroke: "#0096fd",
      strokeWidth: "4px",
      strokeDasharray: "5,5",
      fill: "none",
      cursor: "move",
    };

    let epsilon = 3;

    let holeWidth = element.properties.get("width").get("length");
    let holePath = `M${0} ${-epsilon}  L${holeWidth} ${-epsilon}  L${holeWidth} ${epsilon}  L${0} ${epsilon}  z`;
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let length = element.properties.get("width").get("length");
    console.log("holeStyle", holeStyle);
    return (
      <g
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 23 12"
        style={holeStyle}
      >
        <g
          id="Group_9"
          data-name="Group 9"
          transform="translate(-973 -640.5)"
          style={holeStyle}
        >
          <path
            id="Path_21"
            data-name="Path 21"
            d="M51,213.5v11H73v-11H69.5V221h-15v-7.5Z"
            transform="translate(922.5 427.5)"
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          <rect
            id="Rectangle_11"
            data-name="Rectangle 11"
            width="22"
            height="2.04"
            transform="translate(973.5 649.96)"
          />
        </g>
      </g>
    );
  },

  render3D: function (element, layer, scene) {
    let object = new Three.Object3D();
    return Promise.resolve(object);
  },
};
