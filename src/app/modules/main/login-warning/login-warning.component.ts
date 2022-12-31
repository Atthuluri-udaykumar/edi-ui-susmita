import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { SessionService } from "../../../services/session.service";
import { Title } from "@angular/platform-browser";
import { AuthorizationService } from "../../../services/authorization.service";

@Component({
  selector: "app-login-warning",
  templateUrl: "./login-warning.component.html",
  styleUrls: ["./login-warning.component.css"],
})
export class LoginWarningComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private session: SessionService,
    private titleService: Title,
    private permission: AuthorizationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Login Warning | EDI");
  }

  accept() {
    this.router.navigate(["/login"]);
  }

  // async decline() {
  //   // do session.logout always before authService.logout
  //   await this.session.logout(false);
  //   this.authService.logout();
  //   this.router.navigate(["/login"]);
  // }
}
