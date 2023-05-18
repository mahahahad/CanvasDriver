const canvasEl = document.querySelector("#canvas");
canvasEl.height = innerHeight;
canvasEl.width = innerWidth;

let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

class Car {
  constructor(canvasContext) {
    this.c = canvasContext;

    this.carLength = 160;
    this.carWidth = 70;
    this.tireWidth = 19;
    this.tireLength = 38;
    this.rotationAngle = 1;

    // Start off at the center of the screen
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;

    this.render();
    this.handle();
  }

  render() {
    // Clear screen before every redraw
    this.c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.c.beginPath();
    // Bottom Right Tire
    this.c.rect(
      this.x + this.carWidth / 2,
      this.y + this.carLength / 2,
      this.tireWidth,
      this.tireLength
    );

    // Bottom Left Tire
    this.c.rect(
      this.x - this.carWidth / 2,
      this.y + this.carLength / 2,
      this.tireWidth,
      this.tireLength
    );

    let xPos = this.x + this.carWidth / 2;
    let yPos = this.y - this.carLength / 2;
    let tireHorizontalCenter = xPos + this.tireWidth / 2;
    let tireVerticalCenter = yPos + this.tireLength / 2;

    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate(Math.PI / this.rotationAngle);
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);

    // Top Right Tire
    this.c.rect(
      this.x + this.carWidth / 2,
      this.y - this.carLength / 2,
      this.tireWidth,
      this.tireLength
    );

    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate(Math.PI / -this.rotationAngle);
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);

    xPos = this.x - this.carWidth / 2;
    yPos = this.y - this.carLength / 2;
    tireHorizontalCenter = xPos + this.tireWidth / 2;
    tireVerticalCenter = yPos + this.tireLength / 2;

    // Rotate the tire
    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate(Math.PI / this.rotationAngle);
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);

    // Draw the tire
    this.c.rect(xPos, yPos, this.tireWidth, this.tireLength);
    this.c.stroke();

    // Cancel out the rotation for the next redraw
    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate(Math.PI / -this.rotationAngle);
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);
  }

  handle() {
    let distance = 5;
    document.addEventListener("keypress", (e) => {
      switch (e.key) {
        case "w":
          this.y -= distance;
          // console.log("Move Forwards");
          break;
        case "a":
          // this.x -= distance;
          if (this.rotationAngle > 1.25) return;
          if (this.rotationAngle == -1) this.rotationAngle = 1;
          this.rotationAngle += 0.1;
          // console.log("Move Left");
          break;
        case "s":
          this.y += distance;
          // console.log("Move Backwards");
          break;
        case "d":
          // this.x += distance;
          if (this.rotationAngle < -1.25) return;
          if (this.rotationAngle == 1) this.rotationAngle = -1;
          this.rotationAngle -= 0.1;
          // console.log("Move Right");
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
