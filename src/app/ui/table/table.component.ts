import { Component, Input, OnChanges } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() tableData: Record<string, any>[] = [];
  @Input() selectedMetrics: string[] = [];
  @Input() filterMode: string;
  displayedColumns: string[] = Object.keys(this.tableData);
  dataSource: Record<string, any> = [];
  singleBreakdown: boolean = false;
  singleMetric: boolean = false;

  constructor(private uiService: UIService) {}

  ngOnChanges(): void {
    this.displayedColumns = [
      ...Object.keys(this.tableData[0])
        .filter((k) => !this.selectedMetrics.includes(k))
        .filter((k) => k != 'book'),
      ...new Set(this.tableData.map((e) => e.book)),
    ];
    this.convertData();
  }

  convertData() {
    const convertedData: Record<string, any> = [];
    const targetKey = Object.keys(this.tableData[0])
      .filter((k) => !this.selectedMetrics.includes(k))
      .filter((k) => k != 'book')[0];

    this.singleBreakdown =
      Object.keys(this.tableData[0])
        .filter((k) => !this.selectedMetrics.includes(k))
        .filter((k) => k != 'book').length === 1;

    this.singleMetric = this.selectedMetrics.length === 1;

    const targetKeyEntries = [
      ...new Set(this.tableData.map((e) => e[targetKey])),
    ];
    const books = [...new Set(this.tableData.map((e) => e.book))];

    targetKeyEntries.forEach((val) => {
      const newEntry: Record<string, any> = {};
      newEntry[targetKey] = val;
      books.forEach((book) => {
        // const bookEntry = this.tableData.filter(
        //   (e) => e[targetKey] === val && e.book === book
        // )[0]['book'];
        this.selectedMetrics.forEach((metric) => {
          newEntry[book] =
            this.filterMode === 'aggregate'
              ? this.tableData.filter((e) => {
                  return e[targetKey] === val && e.book === book && e[metric];
                })[0][metric]
              : '-';
        });
      });

      convertedData.push(newEntry);
    });
    this.dataSource = convertedData;
  }

  onClick() {
    this.uiService.drilldownEvent.emit();
  }
}
