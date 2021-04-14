import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Metric } from 'src/app/shared/models';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  @Input() metrics: Metric[] = [];
  metricOptions: Record<string, string[]> = {};
  metricSelections: Record<string, string> = {};
  metricFormControls: Record<string, FormControl> = {};
  metricEnableFormControls: Record<string, FormControl> = {};
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.metrics
      .map((e) => e.name)
      .forEach((name, i) => {
        this.metricOptions[name] = this.metrics[i].options;
        this.metricSelections[name] = this.metrics[i].selection;
        this.metricFormControls[name] = new FormControl(
          this.metrics[i].selection
        );
        this.metricEnableFormControls[name] = new FormControl(
          this.metrics[i].enabled
        );
      });
  }

  onRadioChange(event: any, i: number) {
    this.dataService.metrics[this.metrics[i].name] = event.value;
    this.dataService.dataUpdated.emit();
  }
  onCheckChange(event: any, i: number) {
    if (event.checked) {
      this.dataService.metrics[this.metrics[i].name] = this.metricFormControls[
        this.metrics[i].name
      ].value;
    } else {
      this.dataService.metrics[this.metrics[i].name] = undefined;
    }
    this.dataService.dataUpdated.emit();
  }
}
