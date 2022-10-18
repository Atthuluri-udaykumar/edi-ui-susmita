import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {GeneralModule} from '../shared-modules/general/general.module';
import {AppRoutingModule} from '../../app-routing.module';
import {HeaderComponent} from './header/header.component';
import {MenubarModule} from 'primeng-lts/menubar';

@NgModule({
  imports: [
    CommonModule,
    GeneralModule,
    AppRoutingModule,
    MenubarModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule {
}
