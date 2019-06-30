import React, { Component } from "react";
import "./FanNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FanNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      toggleButtonPosition: { x: 0, y: 0 }
    };

    this.toggleActive = this.toggleActive.bind(this);
    this.computeDistance = this.computeDistance.bind(this);
    this.handleClick = this.handeClick.bind(this);
    this.getElementMidpoint = this.getElementMidpoint.bind(this);
    this.getItemStyle = this.getItemStyle.bind(this);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.opacity = 0;
    this.toggle = React.createRef();
    this.items = this.props.items.map(item => ({
      ...item,
      ref: React.createRef()
    }));
  }
  componentDidMount() {
    this.setState({
      toggleButtonPosition: this.getElementMidpoint(this.toggle.current)
    });
    document.addEventListener("mousedown", this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handeClick(e) {
    if (
      this.state.active &&
      this.wrapperRef &&
      !this.wrapperRef.contains(e.target)
    ) {
      this.setState({ active: false });
    }
  }
  getElementMidpoint(el) {
    const { x, y, width, height } = el.getBoundingClientRect();
    return { x: x + width / 2, y: y + height / 2 };
  }
  computeDistance(ref, b = this.state.toggleButtonPosition) {
    if (ref.current) {
      const { x, y } = this.getElementMidpoint(ref.current);
      const d = { x: b.x - x, y: b.y - y };
      return d;
    }
    return { x: 0, y: 0 };
  }
  toggleActive() {
    this.setState({ active: !this.state.active });
  }
  getItemStyle(item) {
    return {
      transform: this.state.active
        ? `translate3d(0, 0, 0)`
        : `translate3d(0, ${this.computeDistance(item.ref).y}px, 0)`
    };
  }
  render() {
    const { active } = this.state;
    return (
      <div
        className={`fannav fadeIn ${active ? "is-active" : ""}`}
        ref={this.setWrapperRef}
      >
        <div className="fannav__inner">
          <div className="fannav__menu">
            {this.items.map((item, i) => (
              <div
                key={i}
                className="fannav__menu__item"
                ref={item.ref}
                style={this.getItemStyle(item)}
              >
                <a
                  className={item.className}
                  href={item.to}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{item.title}</span>
                  <FontAwesomeIcon icon={item.icon} fixedWidth />
                </a>
              </div>
            ))}
          </div>
          <div className="fannav__toggle">
            <button
              className={`btn btn-primary btn-lg toggle toggle--spin ${
                active ? "is-active" : ""
              }`}
              ref={this.toggle}
              onClick={this.toggleActive}
            >
              <span className="toggle-box">
                <span className="toggle-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FanNav;
