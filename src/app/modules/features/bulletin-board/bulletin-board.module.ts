import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulletinBoardComponent } from './bulletin-board.component';
import { DialogModule } from 'primeng-lts/dialog';
import { MultiSelectModule } from 'primeng-lts/multiselect';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { FormsModule } from '@angular/forms';
import { BulletinBoardRoutingModule } from './bulletin-board-routing.module';



@NgModule({
  declarations: [
    BulletinBoardComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    MultiSelectModule,
    InputTextareaModule,
    BulletinBoardRoutingModule
  ]
})
export class BulletinBoardModule { }
