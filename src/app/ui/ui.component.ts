import { Component, OnInit } from '@angular/core';
import { UIService } from '../services/ui.service';
import { createMockupData } from '../../utils/data';
import { Entity, Filter, Metric } from '../shared/models';
import { DataService } from '../services/data.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
})
export class UiComponent implements OnInit {
  entities: Entity[] = cloneDeep(this.uiService.entities);
  filters: Filter[] = cloneDeep(this.uiService.filters);
  metrics: Metric[] = cloneDeep(this.uiService.metrics);
  tableData: Record<string, any>[] = [];
  selectedMetrics: string[] = [];
  filterMode: string;

  constructor(private uiService: UIService, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.dataUpdated.subscribe(() => {
      this.dataService.updateTableData();
      this.tableData = this.dataService.tableData;
      this.selectedMetrics = Object.keys(this.dataService.metrics).filter(
        (k) => this.dataService.metrics[k] != undefined
      );
      this.filterMode = this.dataService.filterMode;
    });

    setTimeout(() => {
      this.dataService.dataUpdated.emit();
    }, 200);
  }
}
