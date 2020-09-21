import { Catalog } from 'react-planner';
import React from "react";

let catalog = new Catalog();

import * as Areas from './areas/**/planner-element.jsx';
import * as Lines from './lines/**/planner-element.jsx';
import * as Holes from './holes/**/planner-element.jsx';
import * as Items from './items/**/planner-element.jsx';

for (let x in Areas) catalog.registerElement(Areas[x]);
for (let x in Lines) catalog.registerElement(Lines[x]);
for (let x in Holes) catalog.registerElement(Holes[x]);
for (let x in Items) catalog.registerElement(Items[x]);


let win_img = require("../catalog/window.png");
let door_img = require("../catalog/door.png");
let pilsrs = require("../catalog/pilars.png");



catalog.registerCategory('windows', < img className="img_catagory" src={win_img} style={{ width: "100%" }} />, [Holes.window, Holes.sashWindow, Holes.venetianBlindWindow, Holes.windowCurtain, Holes.fiveWindow, Holes.sixWindow, Holes.sevenWindow, Holes.eightWindow]);
catalog.registerCategory('doors', < img className="img_catagory" src={door_img} style={{ width: "100%" }} />, [Holes.door, Holes.doorDouble, Holes.panicDoor, Holes.panicDoorDouble, Holes.slidingDoor, Holes.gate,]);

export default catalog;
