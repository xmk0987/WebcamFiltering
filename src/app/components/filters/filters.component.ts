import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { FilterService } from '../../services/filter/filter.service';

@Component({
  selector: 'app-filters',
  imports: [PrimaryButtonComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  filterService = inject(FilterService);

}
