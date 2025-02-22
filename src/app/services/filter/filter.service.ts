import { Injectable, signal } from '@angular/core';

export type FilterType = 'gray' | 'ascii' | '';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterType = signal<FilterType>('');

  constructor() {}

  changeFilter(filter: FilterType) {
    console.log('Filter changed', filter);
    this.filterType.set(filter);
  }

  applyGrayScaleFilter(frame: ImageData) {
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

    return frame;
  }

  applyAsciiFilter(frame: ImageData) {
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

    return asciiArt;
  }
}
