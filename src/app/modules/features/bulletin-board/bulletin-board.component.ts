import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BulletinBoardService } from 'src/app/services/bulletin-board.service';

@Component({
  selector: 'app-bulletin-board',
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.css']
})
export class BulletinBoardComponent implements OnInit {

  applications: string[];
  newMessage: string;
  displayPreview: boolean = false;
  selectedApplications: string[];

  mockData = [
    {application: 'Section 111', message: 'This is a test message from Section 111'},
    {application: 'WCMSAP', message: 'This is a test message from WCMSAP'},
    {application: 'MSPRP', message: 'This is a test message from MSPRP'},
    {application: 'CRCP', message: 'This is a test message from CRCP'},
    {application: 'ECRS', message: 'This is a test message from ECRS'}
  ];

  constructor(private router: Router, private bulletinBoardService: BulletinBoardService) {
    this.applications = ['Section 111', 'WCMSAP', 'MSPRP', 'CRCP', 'ECRS'];
   }

  ngOnInit() {
  }

  onSelect() {
    if (this.selectedApplications.length === 1) {
      this.newMessage = this.mockData.find(x => x.application === this.selectedApplications[0]).message;
    } else {
      this.newMessage = '';
    }
  }

  preview() {
    this.displayPreview = true;
  }

  cancelPreview() {
    this.displayPreview = false;
  }

  submit() {
    console.log('submitted');
    this.bulletinBoardService.submitBulletinBoardMessages(this.selectedApplications, this.newMessage).subscribe(res => {
      console.log('response:', res);
      this.selectedApplications = [];
      this.newMessage = null;
      this.displayPreview = false;
    }, err => {
      console.error('error saving to bulletin board:', err)
    })
  }

  cancel() {
    this.router.navigate(['/dashboard'])
  }


}
