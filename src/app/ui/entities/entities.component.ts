import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/app/shared/models';
import { FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
})
export class EntitiesComponent implements OnInit {
  @Input() entities: Entity[] = [];
  selectFormControls: Record<string, FormControl> = {};
  breakdownEnabledFormControls: Record<string, FormControl> = {};
  entityOptions: Record<string, { name: string; id: string }[]> = {};
  entitySelections: Record<string, string[]> = {};
  entitySelectionPresets: Record<string, string> = {};

  constructor(private dataService: DataService, private uiService: UIService) {}

  ngOnInit(): void {
    this.uiService.drilldownEvent.subscribe(() => {
      this.entitySelections['sports'] = ['soccer'];
      this.dataService.filters['sport'] = ['soccer'];

      this.breakdownEnabledFormControls['competitions'].setValue(true);
      this.dataService.filters['league'] = this.entitySelections[
        'competitions'
      ];

      this.breakdownEnabledFormControls['matches'].setValue(false);
      delete this.dataService.filters['match'];

      this.breakdownEnabledFormControls['odd_types'].setValue(false);
      delete this.dataService.filters['ot'];

      this.dataService.dataUpdated.emit();
    });
    this.entities
      .map((e) => e.name)
      .forEach((name, i) => {
        this.selectFormControls[name] = new FormControl();
        this.entityOptions[name] = this.entities[i].options;
        this.entitySelections[name] = this.entities[i].selections.map(
          (e) => e.name
        );
        this.breakdownEnabledFormControls[name] = new FormControl(
          this.entities[i].breakdownEnabled
        );
        this.entitySelectionPresets[name] = this.entities[i].breakdownPreset;
      });
  }

  onChange(event: any, i: number) {
    this.dataService.filters[this.entities.map((e) => e.fieldName)[i]] =
      event.value;
    this.dataService.dataUpdated.emit();
    this.entitySelectionPresets[this.entities[i].name] = 'Custom';
  }
  onCheckChange(event: any, i: number) {
    if (event.checked) {
      this.dataService.filters[
        this.entities[i].fieldName
      ] = this.entitySelections[this.entities[i].name];
    } else {
      delete this.dataService.filters[this.entities[i].fieldName];
    }
    this.dataService.dataUpdated.emit();
  }
}
