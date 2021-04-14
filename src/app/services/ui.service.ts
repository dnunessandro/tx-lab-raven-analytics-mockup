declare var require: any;
import { EventEmitter, Injectable } from '@angular/core';
import { Entity, Filter, Metric } from '../shared/models';
import { cloneDeep, orderBy } from 'lodash';
import {
  entities as entitiesConfig,
  filters as filtersConfig,
  metrics as metricsConfig,
} from '../../ui-config.json';
const userSettings = require('../../user-settings.json');
const miMetadata = require('../../mi_metadata.json');

@Injectable({
  providedIn: 'root',
})
export class UIService {
  // entities: Entity[] = this.createInitialEntities(
  //   entitiesConfig[0].name,
  //   userSettings
  // );
  entities: Entity[] = this.createInitialEntities(entitiesConfig, userSettings);
  filters: Filter[] = this.createInitialFilters(filtersConfig);
  metrics: Metric[] = this.createInitialMetrics(metricsConfig);

  // createInitialEntities(entityName: string, userSettings: Record<string, any>) {
  //   const entities: Entity[] = [];
  //   const entity = entitiesConfig.filter((e) => e.name === entityName)[0];
  //   const newEntity = {};
  //   newEntity['name'] = entity.name;
  //   newEntity['label'] = entity.label;
  //   newEntity['fieldName'] = entity.fieldName;
  //   newEntity['idFieldName'] = entity.idFieldName;
  //   newEntity['multiSelect'] = true;
  //   newEntity['parents'] = entity.parents;
  //   newEntity['children'] =
  //     entity.children.length !== 0
  //       ? entity.children.map((e) =>
  //           this.createInitialEntities(e, userSettings)
  //         )[0]
  //       : [];
  //   newEntity['selections'] =
  //     userSettings.sets.filter((e) => e.name === newEntity['fieldName'])
  //       .length !== 0
  //       ? userSettings.sets.filter((e) => e.name === newEntity['fieldName'])[0]
  //           .values
  //       : this.getSelectionFromMetadata(
  //           newEntity['fieldName'],
  //           entity.defaultSelections.by,
  //           entity.defaultSelections.ascending,
  //           entity.defaultSelections.n
  //         );
  //   newEntity['options'] = miMetadata[newEntity['fieldName']];
  //   newEntity['breakdownEnabled'] = entity.breakdownCheckedByDefault;

  //   entities.push(newEntity as Entity);
  //   return entities;
  // }

  createInitialEntities(
    entitiesConfig: Record<string, any>[],
    userSettings: Record<string, any>
  ) {
    const entities: Entity[] = [];

    entitiesConfig.forEach((entity) => {
      const newEntity = {};
      newEntity['name'] = entity.name;
      newEntity['label'] = entity.label;
      newEntity['fieldName'] = entity.fieldName;
      newEntity['idFieldName'] = entity.idFieldName;
      newEntity['multiSelect'] = true;
      newEntity['parents'] = entity.parents;
      newEntity['children'] = entity.childrenM;
      newEntity['selections'] =
        userSettings.sets.filter((e) => e.fieldName === newEntity['fieldName'])
          .length !== 0
          ? userSettings.sets.filter(
              (e) => e.fieldName === newEntity['fieldName']
            )[0].values
          : this.getSelectionFromMetadata(
              newEntity['fieldName'],
              entity.defaultSelections.by,
              entity.defaultSelections.ascending,
              entity.defaultSelections.n
            );
      newEntity['options'] = miMetadata[newEntity['fieldName']];
      newEntity['breakdownEnabled'] = entity.breakdownCheckedByDefault;
      newEntity['breakdownPreset'] =
        userSettings.sets.filter((e) => e.fieldName === newEntity['fieldName'])
          .length !== 0
          ? 'Custom Set: ' +
            userSettings.sets.filter(
              (e) => e.fieldName === newEntity['fieldName']
            )[0].name
          : 'Popular ' + entity.label;

      entities.push(newEntity as Entity);
    });
    return entities;
  }

  createInitialFilters(filtersConfig: Record<string, any>) {
    let filters: Filter[] = [];

    filtersConfig.forEach((filter) => {
      const newFilter = {};
      newFilter['name'] = filter.name;
      newFilter['label'] = filter.label;
      newFilter['fieldName'] = filter.fieldName;
      newFilter['options'] = filter.options;
      newFilter['selection'] = filter.defaultValue;
      newFilter['modeOptions'] = filter.modes;
      newFilter['modeSelection'] = filter.defaultMode;

      filters.push(newFilter as Filter);
    });

    return filters;
  }
  createInitialMetrics(metricsConfig: Record<string, any>) {
    let metrics: Metric[] = [];

    metricsConfig.forEach((metric) => {
      const newMetric = {};

      newMetric['name'] = metric.name;
      newMetric['label'] = metric.label;
      newMetric['options'] = metric.aggregations;
      newMetric['selection'] = metric.defaultAggregation;
      newMetric['enabled'] = metric.enabledByDefault;

      metrics.push(newMetric as Metric);
    });

    return metrics;
  }

  getSelectionFromMetadata(
    fieldName: string,
    metric: string,
    ascending: boolean,
    n: number
  ) {
    const values = cloneDeep(miMetadata[fieldName]);

    const selection = orderBy(values, [metric], [ascending ? 'asc' : 'desc'])
      .slice(0, n)
      .map((e) => ({ name: e.name, id: e.id }));

    return selection;
  }

  drilldownEvent = new EventEmitter();
}
