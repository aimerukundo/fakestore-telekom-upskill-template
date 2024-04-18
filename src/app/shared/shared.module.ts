import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavComponent,
    ModalComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    InputComponent
  ]
})
export class SharedModule { }
