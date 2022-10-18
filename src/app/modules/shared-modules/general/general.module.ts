import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrintComponent} from './print/print.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorMessagesComponent} from './error-messages/error-messages.component';
import {AsteriskPipe} from '../../../pipes/asterisk.pipe';
import {PopUpDirective} from '../../../directives/pop-up.directive';
import {SafePipe} from '../../../pipes/safe.pipe';
import {DisableControlDirective} from '../../../directives/disable-control.directive';
import {NoDblClickDirective} from '../../../directives/no-dbl-click.directive';
import {UserAgreementComponent} from '../static-content/user-agreement/user-agreement.component';
import {FloatDirective} from '../../../directives/float.directive';
import {HelpComponent} from './help/help.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {RdsInputComponent} from './rds-input/rds-input.component';
import {RdsSelectComponent} from './rds-select/rds-select.component';
import {BlurForwarderDirective} from '../../../directives/blur-forwarder.directive';
import {LoadingComponent} from './loading/loading.component';
import {DialogDirective} from '../../../directives/dialog.directive';
import {AccordionDirective} from '../../../directives/accordion.directive';
import {RdsCheckboxComponent} from './rds-checbox/rds-checkbox.component';
import {PaginatorDirective} from '../../../directives/paginator.directive';
import {rdsPatternDirective} from '../../../directives/edi-pattern.directive';
import {OverlayDirective} from '../../../directives/overlay.directive';
import {TableDirective} from '../../../directives/table.directive';
import {SsnMaskDirective} from '../../../directives/ssn-mask.directive';
import {RdsDateComponent} from './rds-date/rds-date.component';
import {RangeFilterDirective} from '../../../directives/range-filter.directive';
import {PhonePipe} from '../../../pipes/phone.pipe';
import {HasRoleDirective} from '../../../directives/has-role.directive';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {PanelMenuModule} from 'primeng-lts/panelmenu';
import {RdsInputWrapperComponent} from './rds-input-wrapper/rds-input-wrapper.component';
import {RdsDobWrapperComponent} from './rds-dob-wrapper/rds-dob-wrapper.component';
import {NoStarPipe} from '../../../pipes/no-star.pipe';
import {RdsCheckboxWrapperComponent} from './rds-checbox-wrapper/rds-checkbox-wrapper.component';
import {NegativePipe} from '../../../pipes/negative.pipe';
import {RdsListComponent} from './rds-list/rds-list.component';
import {SideMenuIconDirective} from '../../../directives/side-menu-icon.directive';
import {RdsFileInputComponent} from './rds-file-input/rds-file-input.component';
import {EphiComponent} from '../static-content/ephi/ephi.component';
import {DialogModule} from 'primeng-lts/dialog';
import { RdsActionsComponent } from './rds-actions/rds-actions.component';
import {CaptionDirective} from '../../../directives/caption.directive';
import {MomentDatePipe} from '../../../pipes/moment-date.pipe';
import { TrimDirective } from 'src/app/directives/trim.directive';
import { LoadedDirective } from 'src/app/directives/loaded.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelMenuModule,
    DialogModule
  ],
  declarations: [
    PrintComponent,
    ErrorMessagesComponent,
    NoStarPipe,
    AsteriskPipe,
    PhonePipe,
    PopUpDirective,
    SafePipe,
    NegativePipe,
    DisableControlDirective,
    UserAgreementComponent,
    NoDblClickDirective,
    FloatDirective,
    HelpComponent,
    ProgressBarComponent,
    RdsInputWrapperComponent,
    RdsInputComponent,
    RdsSelectComponent,
    RdsCheckboxComponent,
    RdsCheckboxWrapperComponent,
    BlurForwarderDirective,
    LoadingComponent,
    DialogDirective,
    AccordionDirective,
    PaginatorDirective,
    rdsPatternDirective,
    OverlayDirective,
    TableDirective,
    SsnMaskDirective,
    RdsDateComponent,
    RdsDobWrapperComponent,
    RangeFilterDirective,
    HasRoleDirective,
    SideMenuComponent,
    RdsListComponent,
    SideMenuIconDirective,
    RdsFileInputComponent,
    EphiComponent,
    RdsActionsComponent,
    CaptionDirective,
    MomentDatePipe,
    TrimDirective,
    LoadedDirective
  ],
  exports: [
    PrintComponent,
    ErrorMessagesComponent,
    AsteriskPipe,
    PhonePipe,
    PopUpDirective,
    SafePipe,
    DisableControlDirective,
    UserAgreementComponent,
    FloatDirective,
    HelpComponent,
    ProgressBarComponent,
    RdsInputWrapperComponent,
    RdsInputComponent,
    RdsSelectComponent,
    RdsCheckboxComponent,
    RdsCheckboxWrapperComponent,
    BlurForwarderDirective,
    LoadingComponent,
    DialogDirective,
    AccordionDirective,
    PaginatorDirective,
    rdsPatternDirective,
    OverlayDirective,
    TableDirective,
    SsnMaskDirective,
    RdsDateComponent,
    RdsDobWrapperComponent,
    RangeFilterDirective,
    HasRoleDirective,
    SideMenuComponent,
    NegativePipe,
    RdsListComponent,
    SideMenuIconDirective,
    RdsFileInputComponent,
    EphiComponent,
    RdsActionsComponent,
    CaptionDirective,
    MomentDatePipe,
    TrimDirective,
    LoadedDirective
  ]
})
export class GeneralModule {
}
