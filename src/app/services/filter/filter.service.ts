import { Injectable, signal } from '@angular/core';
import { Particle } from '../../models/Particle.model';

export type FilterType = 'gray' | 'ascii' | 'warm' | 'cool' | 'particles' | '';

const WARM_COOL_ADJUSTMENT = 20;
@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterType = signal<FilterType>('');

  private animationId: number | null = null;
  isAnimating: boolean = false;
  numberOfParticles: number = 3000;
  particlesArray: Particle[] = [];

  constructor() {}

  changeFilter(filter: FilterType) {
    console.log('Filter changed', filter);
    this.filterType.set(filter);
  }

  applyGrayScaleFilter(frame: ImageData, ctx: CanvasRenderingContext2D) {
    const data = frame.data;

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      const gray = 0.3 * red + 0.59 * green + 0.11 * blue;

      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    ctx.putImageData(frame, 0, 0);
  }

  applyWarmFilter(frame: ImageData, ctx: CanvasRenderingContext2D) {
    const data = frame.data;
    const adjustment = WARM_COOL_ADJUSTMENT;

    for (let i = 0; i < data.length; i += 4) {
      data[i] += adjustment;
      data[i + 2] -= adjustment;
    }

    ctx.putImageData(frame, 0, 0);
  }

  applyCoolFilter(frame: ImageData, ctx: CanvasRenderingContext2D) {
    const data = frame.data;
    const adjustment = WARM_COOL_ADJUSTMENT;

    for (let i = 0; i < data.length; i += 4) {
      data[i] -= adjustment;
      data[i + 2] += adjustment;
    }

    ctx.putImageData(frame, 0, 0);
  }

  applyAsciiFilter(frame: ImageData, ctx: CanvasRenderingContext2D) {
    const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
    const data = frame.data;
    const w = frame.width;
    const h = frame.height;

    let asciiArt = '';

    for (let y = 0; y < h; y++) {
      let row = '';
      for (let x = 0; x < w; x++) {
        const pixelIndex = (y * w + x) * 4;
        const red = data[pixelIndex];
        const green = data[pixelIndex + 1];
        const blue = data[pixelIndex + 2];

        const avg = (red + green + blue) / 3;
        const charIndex = Math.floor((avg / 255) * (density.length - 1));
        row += density.charAt(charIndex);
      }
      asciiArt += row + '\n';
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    ctx.font = `1.7px monospace`;
    ctx.fillStyle = 'green';
    const lines = asciiArt.split('\n');
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 0, i);
    }
  }

  initParticlesFilter(frame: ImageData, ctx: CanvasRenderingContext2D) {
    const w = frame.width;
    const h = frame.height;
    this.particlesArray = [];

    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particlesArray.push(new Particle(w, h, ctx));
    }

    this.isAnimating = true;

    ctx.globalAlpha = 0.2;
  }

  startParticlesAnimation(
    frame: ImageData,
    ctx: CanvasRenderingContext2D
  ): void {
    const w = frame.width;
    const h = frame.height;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    if (this.isAnimating) return;

    console.log('Start animating particles');
    this.initParticlesFilter(frame, ctx);
    this.animateParticles(frame, ctx);
  }

  animateParticles(frame: ImageData, ctx: CanvasRenderingContext2D): void {
    if (!this.isAnimating) return;

    for (let i = 0; i < this.particlesArray.length; i++) {
      this.particlesArray[i].update();
      this.particlesArray[i].draw();
    }

    this.animationId = requestAnimationFrame(() =>
      this.animateParticles(frame, ctx)
    );
  }

  stopParticlesAnimation(ctx: CanvasRenderingContext2D): void {
    console.log('Stop animating particles');
    this.isAnimating = false;
    ctx.globalAlpha = 1;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
