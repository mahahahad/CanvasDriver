const canvasEl = document.querySelector("#canvas");
canvasEl.height = innerHeight;
canvasEl.width = innerWidth;

let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

/*
Car is a thing that has 4 tires
  Its coordinates are based on its center
  Everything works with respect to that

The front 2 tires can steer to change their direction
  Direction changes depending on how long the direction key has been pressed for
  These 2 tires can exist together as they will be linked
The back 2 tires remain constant at all times
  Honestly, only present to give the illusion of an actual car
  These can also exist together as they are also linked
*/

class Car {
  constructor(canvasContext) {
    this.c = canvasContext;

    this.carLength = 160;
    this.carWidth = 70;
    this.tireWidth = 19;
    this.tireLength = 38;

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

    // Top Right Tire
    this.c.rect(
      this.x + this.carWidth / 2,
      this.y - this.carLength / 2,
      this.tireWidth,
      this.tireLength
    );

    // this.c.translate(this.x - this.carWidth / 2, this.y - this.carHeight / 2);
    // this.c.rotate(Math.PI / 2);
    // this.c.translate(
    //   (this.x - this.carWidth / 2) * -1,
    //   (this.y - this.carHeight / 2) * -1
    // );

    // Top Left Tire
    // let corner = this.x - this.carWidth / 2;
    // this.c.translate(corner + tireWidth / 2, 24);
    // this.c.rotate(Math.PI / 1.25);
    // this.c.translate(-15, -24);
    // this.c.rect(
    //   this.x - this.carWidth / 2,
    //   this.y - this.carLength / 2,
    //   this.tireWidth,
    //   this.tireLength
    // );

    let xPos = this.x - this.carWidth / 2;
    let yPos = this.y - this.carLength / 2;
    this.c.translate(xPos + this.tireWidth / 2, yPos + this.tireLength / 2);
    this.c.rotate(Math.PI / 1.25);
    this.c.translate(
      (xPos + this.tireWidth / 2) * -1,
      (yPos + this.tireLength / 2) * -1
    );
    this.c.rect(xPos, yPos, this.tireWidth, this.tireLength);
    this.c.stroke();
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
          this.x -= distance;
          // console.log("Move Left");
          break;
        case "s":
          this.y += distance;
          // console.log("Move Backwards");
          break;
        case "d":
          this.x += distance;
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
