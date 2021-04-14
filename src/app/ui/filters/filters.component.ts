import { Component, Input, OnInit } from '@angular/core';
import { Filter } from 'src/app/shared/models';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() filters: Filter[] = [];
  filterOptions: Record<string, { label: string; value: string }[]> = {};
  filterSelections: Record<string, string> = {};
  filterModeOptions: Record<string, { label: string; value: string }[]> = {};
  filterModeSelections: Record<string, string>[] = [];
  filterModesFormControls: Record<string, FormControl> = {};

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.filters
      .map((e) => e.name)
      .forEach((name, i) => {
        this.filterOptions[name] = this.filters[i].options;
        this.filterSelections[name] = this.filters[i].selection;
        this.filterModeOptions[name] = this.filters[i].modeOptions;
        this.filterModeSelections[name] = this.filters[i].modeSelection.value;
        this.filterModesFormControls[name] = new FormControl(
          this.filters[i].modeSelection.value
        );
      });
  }

  onChange(event: any) {
    this.dataService.filterMode = event.value;
    console.log(this.dataService.filterMode);
    this.dataService.dataUpdated.emit();
  }
}
