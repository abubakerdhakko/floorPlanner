'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaFactory = exports.WallRectFactory = exports.WallSQFactory = exports.WallFactory = undefined;

var _wallFactory = require('./wall-factory');

var _wallFactory2 = _interopRequireDefault(_wallFactory);

var _wallSQFactory = require('./wall-SQ-factory');

var _wallSQFactory2 = _interopRequireDefault(_wallSQFactory);

var _wallRectFactory = require('./wall-rect-factory');

var _wallRectFactory2 = _interopRequireDefault(_wallRectFactory);

var _areaFactory = require('./area-factory');

var _areaFactory2 = _interopRequireDefault(_areaFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.WallFactory = _wallFactory2.default;
exports.WallSQFactory = _wallSQFactory2.default;
exports.WallRectFactory = _wallRectFactory2.default;
exports.AreaFactory = _areaFactory2.default;
exports.default = {
  WallFactory: _wallFactory2.default,
  WallSQFactory: _wallSQFactory2.default,
  WallRectFactory: _wallRectFactory2.default,
  AreaFactory: _areaFactory2.default
};