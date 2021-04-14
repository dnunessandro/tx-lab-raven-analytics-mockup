declare var require: any;
import { EventEmitter, Injectable } from '@angular/core';
import { Entity, Filter, Metric } from '../shared/models';
import { cloneDeep, uniqBy } from 'lodash';
import {
  entities as entitiesConfig,
  filters as filtersConfig,
  metrics as metricsConfig,
} from '../../ui-config.json';
const userSettings = require('../../user-settings.json');
const miMetadata = require('../../mi_metadata.json');
const mockupData = require('../../mockupData.json');

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: Record<string, any>[] = cloneDeep(mockupData);
  filteredData: Record<string, any>[] = cloneDeep(mockupData);
  tableData: Record<string, any>[] = cloneDeep(mockupData);
  filters: Record<string, (string | number)[]> = {
    book: ['PinnacleSports', 'IBCBET', '188bet'],
    sport: ['soccer', 'basketball'],
  };
  metrics: Record<string, string> = { overround: 'average' };
  filterMode: string = 'aggregate';

  filterData() {
    let filteredData: Record<string, any>[] = cloneDeep(mockupData);
    Object.keys(this.filters).forEach((field) => {
      filteredData = filteredData.filter((e) =>
        this.filters[field].includes(e[field])
      );
    });

    const cardinalityDict = this.computeCardinality(filteredData);

    filteredData = filteredData.map((e) => {
      const newE = {};

      Object.keys(e).forEach((k: string) => {
        if (
          !k.endsWith('id') &&
          cardinalityDict[k] > 1 &&
          (this.filters[k] != undefined ||
            (Object.keys(this.metrics).includes(k) &&
              this.metrics[k] != undefined))
        ) {
          newE[k] = e[k];
        }
      });
      return newE;
    });
    this.filteredData = filteredData;
  }

  computeMetrics() {
    this.tableData = uniqBy(this.filteredData, (elem) => {
      return Object.keys(elem)
        .filter((k) => !Object.keys(this.metrics).includes(k))
        .map((k) => elem[k])
        .join();
    });
  }

  updateTableData() {
    this.filterData();
    this.computeMetrics();
  }

  computeCardinality(data: Record<string, any>[]) {
    const cardinalityDict: Record<string, number> = {};
    Object.keys(data[0]).forEach((k) => {
      cardinalityDict[k] = [...new Set(data.map((e) => e[k]))].length;
    });
    return cardinalityDict;
  }

  dataUpdated = new EventEmitter();
}
