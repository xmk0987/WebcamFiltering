import { Component } from '@angular/core';
import { VideoComponent } from './components/video/video.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    VideoComponent,
    FiltersComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'videoFilter';
}
