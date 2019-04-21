import {Component, forwardRef, OnInit, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorPickerComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class ColorPickerComponent implements OnInit, ControlValueAccessor {

  public colors: String[] = [
    '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f',
    '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b',
    '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2',
    '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#512da8',
    '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f',
    '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2',
    '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c',
    '#fff59d', '#fff176', '#ffee58', '#fdd835', '#fbc02d', '#f9a825',
    '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00',
    '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#455a64',
];

  private innerValue: any = '';

  constructor() {
  }

  ngOnInit() {
  }

  onChange(e: Event, value: any) {
    this.innerValue = value;
    this.propagateChange(this.innerValue);
  }

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  propagateChange = (_: any) => {
  }

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
  }

}
