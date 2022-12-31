import { ElementRef, Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
/*
Reference:
  https://github.com/primefaces/primeng/blob/master/src/app/showcase/components/table/tableexportdemo.ts
  https://www.c-sharpcorner.com/article/export-data-in-excel-sheet-using-angular/
*/
@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    console.log("exportService: saving to excel.....");
    FileSaver.saveAs(data, fileName + "-" + new Date() + EXCEL_EXTENSION);
  }

  /* This works by converting a JSON array */
  public exportJsonToExcel(json: any[], excelFileName: string): void {
    console.log("exportService: collecting data from JSON array.....");

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  /* This works by converting the element-ref to the DIV element surrounding the p-table */
  public exportTableToExcel(divTagElemRef: ElementRef, excelFileName: string): void {
    console.log("exportService: collecting data from ElemRef......");

    const myworksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(divTagElemRef.nativeElement);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

}
