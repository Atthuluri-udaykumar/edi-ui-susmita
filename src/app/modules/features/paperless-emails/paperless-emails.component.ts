import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-paperless-emails",
  templateUrl: "./paperless-emails.component.html",
  styleUrls: ["./paperless-emails.component.css"],
})
export class PaperlessEmailsComponent implements OnInit {
  fromDate;
  toDate;

  resultsFound: boolean = false;

  accountId = 137836;

  results = [
    {
      date: "12/02/2022",
      link: "https://www.africau.edu/images/default/sample.pdf",
      undeliverable: true,
    },
    {
      date: "12/03/2022",
      link: "https://www.africau.edu/images/default/sample.pdf",
      undeliverable: false,
    },
    {
      date: "12/04/2022",
      link: "https://www.africau.edu/images/default/sample.pdf",
      undeliverable: false,
    },
    {
      date: "12/05/2022",
      link: "https://www.africau.edu/images/default/sample.pdf",
      undeliverable: true,
    },
    {
      date: "12/06/2022",
      link: "https://www.africau.edu/images/default/sample.pdf",
      undeliverable: true,
    },
    {
      date: "12/07/2022",
      link: "https://www.africau.edu/images/default/sample.pdf",
      undeliverable: false,
    },
    {
      date: "12/07/2022",
      link: "https://www.africau.edu/images/default/sample.pdf",
      undeliverable: false,
    },
    {
      date: "12/08/2022",
      link: "https://www.africau.edu/images/default/sample.pdf",
      undeliverable: true,
    },
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  search() {
    this.resultsFound = true;
  }

  cancel() {
    this.router.navigate(["accountInfo"]);
  }
}
