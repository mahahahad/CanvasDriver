const canvasEl = document.querySelector("#canvas");
canvasEl.height = innerHeight;
canvasEl.width = innerWidth;

let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

function degToRad(degrees) {
  return (Math.PI * degrees) / 180;
}

function radToDeg(radians) {
  return (180 * radians) / Math.PI;
}

class Car {
  constructor(canvasContext) {
    this.c = canvasContext;

    this.carLength = 160;
    this.carWidth = 70;
    this.tireWidth = 19;
    this.tireLength = 38;
    this.rotationAngleLeft = 0;
    this.rotationAngleRight = 0;
    // Start off at the center of the screen
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.turningPoint = { x: 0, y: 0 };
    this.updateLocations();
    this.render();
    this.handle();
  }

  updateLocations() {
    this.tireTopLeft = {
      x: this.x - this.carWidth / 2,
      y: this.y - this.carLength / 2,
    };
    this.tireTopRight = {
      x: this.x + this.carWidth / 2,
      y: this.y - this.carLength / 2,
    };
    this.tireBottomLeft = {
      x: this.x - this.carWidth / 2,
      y: this.y + this.carLength / 2,
    };
    this.tireBottomRight = {
      x: this.x + this.carWidth / 2,
      y: this.y + this.carLength / 2,
    };
  }

  render() {
    // Reset styles
    this.c.lineWidth = 1;
    this.c.setLineDash([5, 10]);

    // Clear screen before every redraw
    this.c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Draw arc at center of the screen for reference
    this.c.beginPath();
    this.c.arc(this.x, this.y, 5, 0, 360);
    this.c.fill();

    // Bottom right tire
    this.c.beginPath();
    this.c.rect(
      this.tireBottomRight.x - this.tireWidth / 2,
      this.tireBottomRight.y - this.tireLength / 2,
      this.tireWidth,
      this.tireLength
    );

    // Bottom left tire
    this.c.rect(
      this.tireBottomLeft.x - this.tireWidth / 2,
      this.tireBottomLeft.y - this.tireLength / 2,
      this.tireWidth,
      this.tireLength
    );

    let xPos = this.x + this.carWidth / 2;
    let yPos = this.y - this.carLength / 2;
    let tireHorizontalCenter = xPos;
    let tireVerticalCenter = yPos;

    // Top right tire
    // Rotate the tire
    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate(degToRad(this.rotationAngleRight));
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);
    this.c.rect(
      this.tireTopRight.x - this.tireWidth / 2,
      this.tireTopRight.y - this.tireLength / 2,
      this.tireWidth,
      this.tireLength
    );

    // Cancel out the rotation for the next redraw
    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate(-degToRad(this.rotationAngleRight));
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);

    xPos = this.x - this.carWidth / 2 - this.tireWidth / 2;
    yPos = this.y - this.carLength / 2 - this.tireLength / 2;
    tireHorizontalCenter = xPos + this.tireWidth / 2;
    tireVerticalCenter = yPos + this.tireLength / 2;

    // Rotate the tire
    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate(degToRad(this.rotationAngleLeft));
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);

    // Draw the tire
    this.c.rect(xPos, yPos, this.tireWidth, this.tireLength);
    this.c.fill();

    // Cancel out the rotation for the next redraw
    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate(-degToRad(this.rotationAngleLeft));
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);

    // Bottom tires axis
    // Will always be straight because these will never rotate
    tireHorizontalCenter = this.x + this.carWidth / 2;
    tireVerticalCenter = this.y + this.carLength / 2;

    this.c.beginPath();
    this.c.moveTo(0, tireVerticalCenter);
    this.c.lineTo(innerWidth, tireVerticalCenter);
    this.c.stroke();

    // Top tires axis
    // Based on the rotation of the tire
    // Will always be perpendicular to it
    if (this.rotationAngleLeft != 0) {
      // Right
      tireHorizontalCenter = this.x + this.carWidth / 2;
      tireVerticalCenter = this.y - this.carLength / 2;

      this.c.beginPath();
      this.c.moveTo(tireHorizontalCenter, tireVerticalCenter);
      this.c.lineTo(
        tireHorizontalCenter -
          this.carLength / Math.tan((Math.PI * -this.rotationAngleRight) / 180),
        tireVerticalCenter + this.carLength
      );
      this.c.stroke();
      // Left
      tireHorizontalCenter = this.x - this.carWidth / 2;
      tireVerticalCenter = this.y - this.carLength / 2;

      this.c.beginPath();
      this.c.moveTo(this.tireTopLeft.x, this.tireTopLeft.y);
      this.topLeftBottomIntersection =
        this.tireTopLeft.x -
        this.carLength / Math.tan(degToRad(-this.rotationAngleLeft));
      this.c.lineTo(
        this.topLeftBottomIntersection,
        this.tireTopLeft.y + this.carLength
      );
      this.c.stroke();
    }

    // Vertical car center line
    this.c.beginPath();
    this.c.moveTo(this.x, this.y - this.carLength / 2);
    this.c.lineTo(this.x, this.y + this.carLength / 2);
    this.c.setLineDash([0, 0]);
    this.c.lineWidth = 2;
    this.c.stroke();

    // Bottom axis
    this.c.beginPath();
    this.c.moveTo(this.x - this.carWidth / 2, this.y + this.carLength / 2);
    this.c.lineTo(this.x + this.carWidth / 2, this.y + this.carLength / 2);
    this.c.stroke();

    // Top axis
    this.c.beginPath();
    this.c.moveTo(this.x - this.carWidth / 2, this.y - this.carLength / 2);
    this.c.lineTo(this.x + this.carWidth / 2, this.y - this.carLength / 2);
    this.c.stroke();

    let test = Math.tan(degToRad(90 - this.rotationAngleLeft)) * this.carLength;
    this.turningPoint.x = test + this.tireBottomLeft.x;
    this.turningPoint.y = this.tireBottomLeft.y;
    this.c.beginPath();
    this.c.arc(this.turningPoint.x, this.turningPoint.y, 10, 0, 360);
    this.c.stroke();
  }

  setRotationAngleRight() {
    // let distanceToCommonPoint =
    //   Math.tan(degToRad(90 - this.rotationAngleLeft)) * this.carLength;
    // this.rotationAngleRight =
    //   90 -
    //   radToDeg(
    //     Math.atan(
    //       (distanceToCommonPoint +
    //         (this.tireBottomRight.x - this.tireBottomLeft.x)) /
    //         this.carLength
    //     )
    //   );
    this.rotationAngleRight =
      90 -
      radToDeg(
        Math.atan((this.tireTopRight.x - this.turningPoint.x) / this.carLength)
      );
    this.rotationAngleRight *= -1;

    console.log(
      this.turningPoint,
      this.rotationAngleLeft,
      this.rotationAngleRight
    );
    // console.log(this.rotationAngleLeft, this.rotationAngleRight);
    // this.rotationAngleRight = this.rotationAngleLeft;
  }

  handle() {
    let distance = 5;
    document.addEventListener("keypress", (e) => {
      switch (e.key) {
        case "w":
          this.y -= distance;
          this.updateLocations();
          break;
        case "a":
          if (this.rotationAngleLeft <= -45) return;
          if (this.rotationAngleLeft == -1) this.rotationAngleLeft = 1;
          this.rotationAngleLeft -= 15;
          this.setRotationAngleRight();
          break;
        case "s":
          this.y += distance;
          this.updateLocations();
          break;
        case "d":
          if (this.rotationAngleLeft >= 45) return;
          if (this.rotationAngleLeft == 1) this.rotationAngleLeft = -1;
          this.rotationAngleLeft += 15;
          this.setRotationAngleRight();
          break;
        default:
          break;
      }
      this.render();
    });
  }
}

if (canvasEl.getContext) {
  const c = canvasEl.getContext("2d");

  if (darkMode) {
    c.fillStyle = "White";
    c.strokeStyle = "White";
  } else {
    c.fillStyle = "Black";
    c.strokeStyle = "Black";
  }
  let car = new Car(c);
}
