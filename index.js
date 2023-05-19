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
    this.rotationAngle = -45;

    // Start off at the center of the screen
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;

    this.render();
    this.handle();
  }

  render() {
    // Clear screen before every redraw
    this.c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Draw arc at center of the screen for reference
    this.c.beginPath();
    this.c.arc(this.x, this.y, 5, 0, 360);
    this.c.stroke();

    // Vertical car center line
    this.c.beginPath();
    this.c.moveTo(this.x, this.y - this.carLength / 2);
    this.c.lineTo(this.x, this.y + this.carLength / 2);
    this.c.stroke();

    // Bottom Right Tire
    this.c.beginPath();
    this.c.rect(
      this.x + this.carWidth / 2 - this.tireWidth / 2,
      this.y + this.carLength / 2 - this.tireLength / 2,
      this.tireWidth,
      this.tireLength
    );

    // Bottom Left Tire
    this.c.rect(
      this.x - this.carWidth / 2 - this.tireWidth / 2,
      this.y + this.carLength / 2 - this.tireLength / 2,
      this.tireWidth,
      this.tireLength
    );

    let xPos = this.x + this.carWidth / 2;
    let yPos = this.y - this.carLength / 2;
    let tireHorizontalCenter = xPos;
    let tireVerticalCenter = yPos;

    // Rotate the tire
    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate((this.rotationAngle * Math.PI) / 180);
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);

    // Top Right Tire
    this.c.rect(
      this.x + this.carWidth / 2 - this.tireWidth / 2,
      this.y - this.carLength / 2 - this.tireLength / 2,
      this.tireWidth,
      this.tireLength
    );

    // Cancel out the rotation for the next redraw
    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate(-(this.rotationAngle * Math.PI) / 180);
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);

    xPos = this.x - this.carWidth / 2 - this.tireWidth / 2;
    yPos = this.y - this.carLength / 2 - this.tireLength / 2;
    tireHorizontalCenter = xPos + this.tireWidth / 2;
    tireVerticalCenter = yPos + this.tireLength / 2;

    // Rotate the tire
    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate((this.rotationAngle * Math.PI) / 180);
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);

    // Draw the tire
    this.c.rect(xPos, yPos, this.tireWidth, this.tireLength);
    this.c.stroke();

    // Cancel out the rotation for the next redraw
    this.c.translate(tireHorizontalCenter, tireVerticalCenter);
    this.c.rotate(-(this.rotationAngle * Math.PI) / 180);
    this.c.translate(-tireHorizontalCenter, -tireVerticalCenter);

    // Bottom tires axis
    // Will always be straight because these will never rotate
    tireHorizontalCenter = this.x + this.carWidth / 2;
    tireVerticalCenter = this.y + this.carLength / 2;

    this.c.beginPath();
    this.c.moveTo(tireHorizontalCenter, tireVerticalCenter);
    this.c.lineTo(0, tireVerticalCenter);
    this.c.stroke();

    // Top tires axis
    // Based on the rotation of the tire
    // Will always be perpendicular to it
    tireHorizontalCenter = this.x + this.carWidth / 2;
    tireVerticalCenter = this.y - this.carLength / 2;

    // Right
    tireHorizontalCenter = this.x + this.carWidth / 2;
    tireVerticalCenter = this.y - this.carLength / 2;

    if (this.rotationAngle == 0) {
      this.c.beginPath();
      this.c.moveTo(tireHorizontalCenter, tireVerticalCenter);
      this.c.lineTo(0, tireVerticalCenter);
      this.c.stroke();
    } else {
      this.c.beginPath();
      this.c.moveTo(tireHorizontalCenter, tireVerticalCenter);
      this.c.lineTo(
        tireHorizontalCenter -
          this.carLength / Math.tan((Math.PI * -this.rotationAngle) / 180),
        tireVerticalCenter + this.carLength
      );
      this.c.stroke();
    }

    // Left
    tireHorizontalCenter = this.x - this.carWidth / 2;
    tireVerticalCenter = this.y - this.carLength / 2;

    if (this.rotationAngle == 0) {
      this.c.beginPath();
      this.c.moveTo(tireHorizontalCenter, tireVerticalCenter);
      this.c.lineTo(0, tireVerticalCenter);
      this.c.stroke();
    } else {
      this.c.beginPath();
      this.c.moveTo(tireHorizontalCenter, tireVerticalCenter);
      this.c.lineTo(
        tireHorizontalCenter -
          this.carLength / Math.tan((Math.PI * -this.rotationAngle) / 180),
        tireVerticalCenter + this.carLength
      );
      this.c.stroke();
    }
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
          if (this.rotationAngle <= -45) return;
          if (this.rotationAngle == -1) this.rotationAngle = 1;
          this.rotationAngle -= 15;
          // this.rotationAngle.toFixed(3);
          // console.log("Move Left");
          break;
        case "s":
          this.y += distance;
          // console.log("Move Backwards");
          break;
        case "d":
          // this.x += distance;
          if (this.rotationAngle >= 45) return;
          if (this.rotationAngle == 1) this.rotationAngle = -1;
          this.rotationAngle += 15;
          // this.rotationAngle.toFixed(3);
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
