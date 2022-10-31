import React from "react";
import scratchTopImg from "../../../images/scratchCard.png";
import brush from "../../../images/scratchBrush.png";
import "./index.css";

class ScratchImageComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isDrawing = false;
    this.lastPoint = null;
    this.showConfirm = false;
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.getFilledInPixels = this.getFilledInPixels.bind(this);
    this.handlePercentage = this.handlePercentage.bind(this);
  }

  componentDidMount() {
    this.setState({ showConfirm: false });
    const canvas = this.canvas;
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    canvas.addEventListener("mousedown", this.touchStart);
    canvas.addEventListener("touchstart", this.touchStart);
    canvas.addEventListener("mousemove", this.touchMove);
    canvas.addEventListener("touchmove", this.touchMove);
    canvas.addEventListener("mouseup", this.touchEnd);
    canvas.addEventListener("touchend", this.touchEnd);

    this.ctx = canvas.getContext("2d");
    this.brush = new Image();
    this.brush.src = brush;
    this.cover = new Image();
    this.cover.src = scratchTopImg;
    this.cover.onload = () =>
      this.ctx.drawImage(this.cover, 0, 0, canvas.width, canvas.height);
  }
  componentWillUnmount() {
    const canvas = this.canvas;
    canvas.removeEventListener("mousedown", this.touchStart);
    canvas.removeEventListener("touchstart", this.touchStart);
    canvas.removeEventListener("mousemove", this.touchMove);
    canvas.removeEventListener("touchmove", this.touchMove);
    canvas.removeEventListener("mouseup", this.touchEnd);
    canvas.removeEventListener("touchend", this.touchEnd);
  }

  getPosition(event) {
    let target = this.canvas;
    let offsetX = 0;
    let offsetY = 0;

    if (target.offsetParent !== undefined) {
      while ((target = target.offsetParent)) {
        offsetX += target.offsetLeft;
        offsetY += target.offsetTop;
      }
    }
    const x = (event.pageX || event.touches[0].clientX) - offsetX;
    const y = (event.pageY || event.touches[0].clientY) - offsetY;
    return { x, y };
  }

  touchStart(event) {
    if (window.innerHeight < 600) {
      window.scrollTo({ top: 30, behavior: "smooth" });
    } else if (window.innerHeight < 700) {
      window.scrollTo({ top: 20, behavior: "smooth" });
    } else if (window.innerHeight > 750) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    this.isDrawing = true;
    this.lastPoint = this.getPosition(event);

    this.ctx.globalCompositeOperation = "destination-out";
  }

  touchMove(event) {
    if (!this.isDrawing) return;
    event.preventDefault();

    const ctx = this.ctx;
    const a = this.lastPoint;
    const b = this.getPosition(event);
    const dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    const angle = Math.atan2(b.x - a.x, b.y - a.y);
    const offsetX = this.brush.width / 2;
    const offsetY = this.brush.height / 2;

    for (let x, y, i = 0; i < dist; i++) {
      x = a.x + Math.sin(angle) * i - offsetX;
      y = a.y + Math.cos(angle) * i - offsetY;
      ctx.drawImage(this.brush, x, y);
    }
    this.handlePercentage(this.getFilledInPixels(32));
    this.lastPoint = b;
  }

  touchEnd(event) {
    this.isDrawing = false;
  }

  // Only test every `stride` pixel. `stride`x faster,
  // but might lead to inaccuracy
  getFilledInPixels(stride) {
    if (!stride || stride < 1) {
      stride = 1;
    }

    var pixels = this.canvas
      .getContext("2d")
      .getImageData(0, 0, this.canvas.width, this.canvas.height),
      pdata = pixels.data,
      l = pdata.length,
      total = l / stride,
      count = 0;

    // Iterate over all pixels
    for (var i = (count = 0); i < l; i += stride) {
      if (parseInt(pdata[i]) === 0) {
        count++;
      }
    }

    return Math.round((count / total) * 100);
  }

  handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    if (filledInPixels > 35) {
      this.setState({ showConfirm: true });
    }
  }

  render() {
    return (
      <div >
        <div className="scratch-templete">
          <canvas
            className="scratch-templete-width"
            ref={(el) => (this.canvas = el)}
          />

          <div
            style={{
              position: "absolute",
              textAlign: "center",
              width: "100%",
              top: "25%",
            }}
          >
            <div style={{ marginTop: "20px" }}>
              <div >Congratulation !</div>
              <div >You have won a</div>
              <div >RM 5</div>
              <div >Touch 'N Go Voucher!</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          {/* put the prompt modal here */}
        </div>
      </div>
    );
  }
}

export default ScratchImageComponent;

