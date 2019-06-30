import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from "react";
import "./FanNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var FanNav =
/*#__PURE__*/
function (_Component) {
  _inherits(FanNav, _Component);

  function FanNav(props) {
    var _this;

    _classCallCheck(this, FanNav);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FanNav).call(this, props));
    _this.state = {
      active: false,
      toggleButtonPosition: {
        x: 0,
        y: 0
      }
    };
    _this.toggleActive = _this.toggleActive.bind(_assertThisInitialized(_this));
    _this.computeDistance = _this.computeDistance.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handeClick.bind(_assertThisInitialized(_this));
    _this.getElementMidpoint = _this.getElementMidpoint.bind(_assertThisInitialized(_this));
    _this.getItemStyle = _this.getItemStyle.bind(_assertThisInitialized(_this));
    _this.setWrapperRef = _this.setWrapperRef.bind(_assertThisInitialized(_this));
    _this.opacity = 0;
    _this.toggle = React.createRef();
    _this.items = _this.props.items.map(function (item) {
      return _objectSpread({}, item, {
        ref: React.createRef()
      });
    });
    return _this;
  }

  _createClass(FanNav, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        toggleButtonPosition: this.getElementMidpoint(this.toggle.current)
      });
      document.addEventListener("mousedown", this.handleClick);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClick);
    }
  }, {
    key: "setWrapperRef",
    value: function setWrapperRef(node) {
      this.wrapperRef = node;
    }
  }, {
    key: "handeClick",
    value: function handeClick(e) {
      if (this.state.active && this.wrapperRef && !this.wrapperRef.contains(e.target)) {
        this.setState({
          active: false
        });
      }
    }
  }, {
    key: "getElementMidpoint",
    value: function getElementMidpoint(el) {
      var _el$getBoundingClient = el.getBoundingClientRect(),
          x = _el$getBoundingClient.x,
          y = _el$getBoundingClient.y,
          width = _el$getBoundingClient.width,
          height = _el$getBoundingClient.height;

      return {
        x: x + width / 2,
        y: y + height / 2
      };
    }
  }, {
    key: "computeDistance",
    value: function computeDistance(ref) {
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.toggleButtonPosition;

      if (ref.current) {
        var _this$getElementMidpo = this.getElementMidpoint(ref.current),
            x = _this$getElementMidpo.x,
            y = _this$getElementMidpo.y;

        var d = {
          x: b.x - x,
          y: b.y - y
        };
        return d;
      }

      return {
        x: 0,
        y: 0
      };
    }
  }, {
    key: "toggleActive",
    value: function toggleActive() {
      this.setState({
        active: !this.state.active
      });
    }
  }, {
    key: "getItemStyle",
    value: function getItemStyle(item) {
      return {
        transform: this.state.active ? "translate3d(0, 0, 0)" : "translate3d(0, ".concat(this.computeDistance(item.ref).y, "px, 0)")
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var active = this.state.active;
      return React.createElement("div", {
        className: "fannav fadeIn ".concat(active ? "is-active" : ""),
        ref: this.setWrapperRef
      }, React.createElement("div", {
        className: "fannav__inner"
      }, React.createElement("div", {
        className: "fannav__menu"
      }, this.items.map(function (item, i) {
        return React.createElement("div", {
          key: i,
          className: "fannav__menu__item",
          ref: item.ref,
          style: _this2.getItemStyle(item)
        }, React.createElement("a", {
          className: item.className,
          href: item.to,
          target: "_blank",
          rel: "noopener noreferrer"
        }, React.createElement("span", null, item.title), React.createElement(FontAwesomeIcon, {
          icon: item.icon,
          fixedWidth: true
        })));
      })), React.createElement("div", {
        className: "fannav__toggle"
      }, React.createElement("button", {
        className: "btn btn-primary btn-lg toggle toggle--spin ".concat(active ? "is-active" : ""),
        ref: this.toggle,
        onClick: this.toggleActive
      }, React.createElement("span", {
        className: "toggle-box"
      }, React.createElement("span", {
        className: "toggle-inner"
      }))))));
    }
  }]);

  return FanNav;
}(Component);

export default FanNav;