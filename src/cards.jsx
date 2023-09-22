import React, { Component } from 'react';

class CardDesign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      mouseX: 0,
      mouseY: 0,
      mouseLeaveDelay: null,
    };
  }

  componentDidMount() {
    this.setState({
      width: this.card.offsetWidth,
      height: this.card.offsetHeight,
    });
  }

  handleMouseMove = (e) => {
    const { offsetLeft, offsetTop } = this.card;
    this.setState({
      mouseX: e.pageX - offsetLeft - this.state.width / 2,
      mouseY: e.pageY - offsetTop - this.state.height / 2,
    });
  };

  handleMouseEnter = () => {
    clearTimeout(this.state.mouseLeaveDelay);
  };

  handleMouseLeave = () => {
    const resetMouse = () => {
      this.setState({
        mouseX: 0,
        mouseY: 0,
      });
    };

    this.setState({
      mouseLeaveDelay: setTimeout(resetMouse, 1000),
    });
  };

  render() {
    const { dataImage } = this.props;
    const { width, height, mouseX, mouseY } = this.state;
    const cardStyle = {
      transform: `rotateY(${(mouseX / width) * 30}deg) rotateX(${(mouseY / height) * -30}deg)`,
    };

    const cardBgTransform = {
      transform: `translateX(${(mouseX / width) * -40}px) translateY(${(mouseY / height) * -40}px)`,
    };

    const cardBgImage = {
      backgroundImage: `url(${dataImage})`,
    };

    return (
      <div
        className="card-wrap"
        onMouseMove={this.handleMouseMove}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={(card) => (this.card = card)}
      >
        <div className="card" style={cardStyle}>
          <div className="card-bg" style={{ ...cardBgTransform, ...cardBgImage }}></div>
          <div className="card-info">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default CardDesign;
