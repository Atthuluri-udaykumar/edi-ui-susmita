import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulletinBoardComponent } from './bulletin-board.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: BulletinBoardComponent },
    
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulletinBoardRoutingModule { }
