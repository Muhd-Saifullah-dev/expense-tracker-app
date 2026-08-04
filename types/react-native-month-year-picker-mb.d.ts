declare module "react-native-month-year-picker-mb" {
  import { Component } from "react";

  type MonthYearPickerProps = {
    value: Date;
    onChange: (
      event: any,
      selectedDate?: Date
    ) => void;
    minimumDate?: Date;
    maximumDate?: Date;
  };

  export default class MonthYearPicker extends Component<MonthYearPickerProps> {}
}