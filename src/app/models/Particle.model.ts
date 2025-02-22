export class Particle {
  x: number = 0;
  y: number = 0;
  speed: number = 0;
  velocity: number = Math.random() * 1.5;
  size: number = Math.random() * 1.5 + 1;
  canvasHeight: number = 0;
  canvasWidth: number = 0;
  ctx: CanvasRenderingContext2D | null;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
  }

  update() {
    this.y += this.velocity;
    if (this.y >= this.canvasHeight) {
      this.y = 0;
      this.x = Math.random() * this.canvasWidth;
    }
  }

  draw() {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
