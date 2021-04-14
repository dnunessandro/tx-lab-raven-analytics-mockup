export interface Entity {
  name: string;
  label: string;
  fieldName: string;
  idFieldName: string;
  multiSelect: boolean;
  parents: string[];
  children: Entity[];
  selections: { name: string; id: string }[];
  options: { name: string; id: string }[];
  breakdownEnabled: boolean;
  breakdownPreset: string;
}
// export interface Entity {
//   name: string;
//   label: string;
//   fieldName: string;
//   idFieldName: string;
//   multiSelect: boolean;
//   parents: string[];
//   children: string[];
//   defaultSelections: {
//     n: number;
//     by: string;
//     ascending: boolean;
//   };
//   breakdownCheckedByDefault: true;
// }

export interface Filter {
  name: string;
  label: string;
  fieldName: string;
  options: {
    value: string;
    label: string;
  }[];
  selection: string;
  modeOptions: {
    value: string;
    label: string;
  }[];
  modeSelection: {
    value: string;
    label: string;
  };
}
// export interface Filter {
//   name: string;
//   label: string;
//   fieldName: string;
//   options: {
//     value: string;
//     label: string;
//   }[];
//   defaultValue: string;
// }

export interface Metric {
  name: string;
  label: string;
  options: string[];
  selection: string;
  enabled: boolean;
}
// export interface Metric {
//   name: string;
//   label: string;
//   aggregations: string[];
//   defaultAggregation: string;
// }
