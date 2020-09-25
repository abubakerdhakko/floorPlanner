"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./new-catalog-item.styles.css");

var _catalogItem = require("./catalog-item");

var _catalogItem2 = _interopRequireDefault(_catalogItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

    _this.state = {
      active: ""
    };
    return _this;
  }

  _createClass(Sidebar, [{
    key: "toggleMenu",
    value: function toggleMenu(menu) {
      return this.setState(function (prevState) {
        console.log("prev", prevState);
        if (prevState.active == menu) menu = "";
        return {
          active: menu

        };
      });

      // return this.setState({ active: menu });
    }
  }, {
    key: "handleActiveMenu",
    value: function handleActiveMenu(menu) {
      return this.state.active == menu ? "d-block" : "d-none";
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          list = _props.list,
          listItems = _props.listItems;

      // console.log("list", list);

      return _react2.default.createElement(
        "nav",
        { id: "tool-menu" },
        _react2.default.createElement(
          "ul",
          { className: "parent-menu" },
          list.map(function (category) {
            return _react2.default.createElement(
              "li",
              { className: "", onClick: function onClick() {
                  return _this2.toggleMenu(category.name);
                } },
              category.label,
              _react2.default.createElement(
                "ul",
                { className: _this2.handleActiveMenu(category.name) },
                category.elements.map(function (elem) {
                  // console.log("elem", elem);
                  return _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement(_catalogItem2.default, { key: elem.name, element: elem })
                  );
                  // return <li>{elem.info.title}</li>;
                })
              )
            );
          }),
          listItems.map(function (elemss) {
            return _react2.default.createElement(_catalogItem2.default, { key: elemss.name, element: elemss });
          })
        )
      );
    }
  }]);

  return Sidebar;
}(_react.Component);

exports.default = Sidebar;


{
  /* <CatalogItem key={elem.name} element={elem} /> */
}