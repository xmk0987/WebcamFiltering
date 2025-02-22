import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CommonModule } from '@angular/common';
import { FilterService } from '../../services/filter/filter.service';

@Component({
  selector: 'app-video',
  styleUrls: ['./video.component.scss'],
  templateUrl: './video.component.html',
  imports: [PrimaryButtonComponent, CommonModule],
})
export class VideoComponent implements OnInit {
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  filterService = inject(FilterService);
  isCameraAllowed: boolean = false;
  width: number = 0;
  height: number = 0;
  first: number = 0;

  ngOnInit(): void {
    this.startCamera();
  }

  async startCamera(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = this.videoRef.nativeElement;

      videoElement.srcObject = stream;

      videoElement.onloadedmetadata = () => {
        this.width = videoElement.videoWidth;
        this.height = videoElement.videoHeight;

        const canvas = this.canvasRef.nativeElement;
        canvas.width = this.width;
        canvas.height = this.height;

        this.isCameraAllowed = true;
        videoElement.play();
        this.getFrame();
      };
    } catch (error) {
      console.error('Error accessing webcam:', error);
      this.isCameraAllowed = false;
      alert('To use the app, allow camera access from your settings');
    }
  }

  getFrame(): void {
    const videoElement = this.videoRef.nativeElement;
    if (videoElement.paused || videoElement.ended) {
      return;
    }

    this.computeFrame();
    requestAnimationFrame(() => this.getFrame());
  }

  computeFrame(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.drawImage(this.videoRef.nativeElement, 0, 0, width, height);
    const frame = ctx.getImageData(0, 0, width, height);

    if (this.filterService.filterType() === 'gray') {
      this.filterService.applyGrayScaleFilter(frame);
    }

    switch (this.filterService.filterType()) {
      case 'gray':
        this.filterService.applyGrayScaleFilter(frame);
        ctx.putImageData(frame, 0, 0);
        break;
      case 'ascii':
        const asciiArt = this.filterService.applyAsciiFilter(frame);
        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `1.7px monospace`;
        ctx.fillStyle = 'white';
        const lines = asciiArt.split('\n');
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], 0, i);
        }
        break;
      default:
        ctx.putImageData(frame, 0, 0);
        break;
    }
  }
}
