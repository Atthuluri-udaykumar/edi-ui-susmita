import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Table } from 'primeng-lts/table';
import { SortEvent } from 'primeng-lts/api';
import { LazyLoadEvent } from 'primeng-lts/api';
import * as moment from 'moment';

import { Party } from 'src/app/model/party.interface';
import { ExportService } from 'src/app/services/export.service';
import { PartyService } from 'src/app/services/party.service';

const DATE_FLD_FORMAT:string = 'MM/DD/YYYY';
const MAX_PAGE_ROW_LIMIT:number = 101;

@Component({
  selector: 'app-paperless-parties',
  templateUrl: './paperless-parties.component.html',
  styleUrls: ['./paperless-parties.component.css']
})
export class PaperlessPartiesComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  parties: Party[];
  cols: any[];
  scrollableCols: any[];
  frozenCols: any[];
  first = 0;
  rows = 10;//rows per page default
  totalRecords: number = MAX_PAGE_ROW_LIMIT;
  loading: boolean = false;
  pageParams = { start: 0, end: 0};

  constructor(private router: Router, private partyService: PartyService ,private exportService: ExportService) {}

  ngOnInit() {
    this.cols = [
      { field: "name", 		header: "Name ", placeholder: "Name", applyFilter: true, frozen: true, width: "300", type: "text"},
      { field: "optInDate", 	header: "Opt-In Date", placeholder: "Opt-In Date", applyFilter: false, frozen: false, width: "170", type: "date"},
      { field: "optOutDate",	header: "Opt-Out Date", placeholder: "Opt-Out Date", applyFilter: false, frozen: false, width: "170", type: "date"},
      { field: "partyId", 	header: "Party ID", placeholder: "Party ID", applyFilter: true, frozen: false, width: "140", type: "text"},
      { field: "rreId", 		header: "RRE ID", placeholder: "RRE ID", applyFilter: true, frozen: false, width: "140", type: "text"},
      { field: "tin", 		header: "TIN", placeholder: "TIN", applyFilter: true, frozen: false, width: "160", type: "text"},
      { field: "siteId", 		header: "Office Code/Site ID", placeholder: "Office Code/Site ID", applyFilter: true, frozen: false, width: "230", type: "text"},
      { field: "goPaperlessReqBy",header: "Go Paperless Requested By", placeholder: "Requested By", applyFilter: true, frozen: false, width: "280", type: "text"},
      { field: "reqPartyId",	header: "Requester's Party ID", placeholder: "Requester's Party ID", applyFilter: true, frozen: false, width: "220", type: "text"},
      { field: "reqRreId", 	header: "Requester's RRE ID", placeholder: "Requester's RRE ID", applyFilter: true, frozen: false, width: "220", type: "text"},
      { field: "reqTin", 		header: "Requester's TIN", placeholder: "Requester's TIN", applyFilter: true, frozen: false, width: "220", type: "text"},
      { field: "reqSiteId", 	header: "Requester's Office Code/Site ID", applyFilter: true, frozen: false, width: "300", type: "text"}
    ];
    this.scrollableCols = this.frozenCols = this.cols.filter(col => (col.frozen == false));
    this.frozenCols = this.cols.filter(col => (col.frozen == true));

    this.loading = true;
    this.partyService.getParties({start:-1, end:-1})
              .subscribe(res => {
                this.parties = res.data; // ##########  An Observable DOES NOTHING UNTIL something SUBSCRIBES  ##########
                this.totalRecords = res.totalRecords < MAX_PAGE_ROW_LIMIT? res.totalRecords: MAX_PAGE_ROW_LIMIT;
                this.loading = false;

                console.log("Page loadParties TotalRecords= " + this.totalRecords);
              });
  }


  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.parties ? this.first === (this.parties.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.parties ? this.first === 0 : true;
  }


  onClear(table: Table) {
    table.clear(); //helps remove all filters
    /*
    To remove sorting that was applied by the user, we simply "refresh" the backing object array that p-table is using.
    */
    this.first = 0;
    //this.parties = this.insurerParties.concat(this.recoveryAgentParties);
  }

  onExport() {
    //table.exportCSV(); primeng defaults to CSV
    this.exportService.exportTableToExcel(this.TABLE, "GoPaperlessPartiesExport");
  }

  onContinue() {
    this.router.navigate(["accountInfo"]);
  }

  isDateField(fieldName: string) {
    for (const col of this.cols) {
      if((col.field === fieldName) && (col.type === 'date'))
        return true;
    }
    return false;
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string'){
            if(this.isDateField(event.field)){
              const date1 = moment(value1, DATE_FLD_FORMAT);
              const date2 = moment(value2, DATE_FLD_FORMAT);
              if (moment(date2).isBefore(date1))
                result = 1;
              else if (moment(date2).isAfter(date1))
                result = -1;
              else
                result = 0;
            } else {
              result = value1.localeCompare(value2);
            }
        } else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
  }

  loadParties(event: LazyLoadEvent) {
    this.loading = true;
    console.log("Page loadParties EVENT= " + JSON.stringify(event) + " Is-Last-Page? " + this.isLastPage());
    this.first = event.first;

    if(this.isLastPage()){
      this.pageParams = { start: event.first + event.rows,
                          end: this.totalRecords-(event.first + event.rows)
                        };
      setTimeout(() => {
          this.partyService.getParties(this.pageParams)
                          .subscribe(res => {
                            this.parties = res.data; // ##########  An Observable DOES NOTHING UNTIL something SUBSCRIBES  ##########
                            //this.totalRecords = res.totalRecords;
                            this.loading = false;

                            console.log("Page loadParties TotalRecords= " + this.totalRecords);
                          });
          }, 1000);
    }
  }
}
