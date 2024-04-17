import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';



@NgModule({
  declarations: [
    NavComponent,
    ModalComponent,
    InputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavComponent,
    InputComponent
  ]
})
export class SharedModule { }
