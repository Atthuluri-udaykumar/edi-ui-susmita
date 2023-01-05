import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserTableComponent } from "./user-table/user-table.component";
import { DashboardModelComponent } from "./dashboard-model/dashboard-model.component";
import { DialogModule } from "primeng-lts/dialog";
import { UserInformationComponent } from "./user-information/user-information.component";
import { PanelModule } from "primeng-lts/panel";
import { DividerModule } from "primeng-lts/divider";
import { TableModule } from "primeng-lts/table";
import { AccordionModule } from "primeng-lts/accordion";

@NgModule({
  declarations: [
    DashboardComponent,
    UserTableComponent,
    DashboardModelComponent,
    UserInformationComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DialogModule,
    TableModule,
    PanelModule,
    DividerModule,
    AccordionModule,
  ],
})
export class DashboardModule {}
