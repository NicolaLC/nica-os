import {NgModule} from '@angular/core';
import {SelectComponent} from './gui/select.component';
import {CommonModule} from '@angular/common';

const components = [
  SelectComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [...components],
  declarations: [...components],
  providers: [],
})
export class CommonsModule {
}
