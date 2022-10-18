import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { MenuItem } from 'primeng-lts/api';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { Person } from 'src/app/model/person.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  environmentUrl = environment.url;

  toggleBanner = false;
  @ViewChild('headerButton') headerButton: ElementRef;
  @ViewChild('headerArea') headerArea: ElementRef;

  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('navigator') navigator: ElementRef;

  theDate: Date = new Date();
  zone: string = '';

  items: MenuItem[] = [];

  current_user: Person;

  fullName: string = '';

  constructor(private authService: AuthService, private session: SessionService, public renderer: Renderer2, private router: Router) {
  }

  ngOnInit() {

    setInterval(() => {
      this.theDate = new Date();
    }, 60000);

    let dashboard = {
      label: 'DashBoard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard']
    };

    let dashboardactuary = {
      label: 'DashBoard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard-actuary']
    };

    let info = {
      label: 'User Guide', icon: 'pi pi-info-circle', command: () => this.viewUserGuide()
    };

    this.authService.authenticated.subscribe(authenticated => {
      this.items = [];
      if (authenticated) {
        if (this.session.getCurrentUser().role.toString() === '4' || this.session.getCurrentUser().role.toString() === '6') {
          this.items.push(dashboardactuary);
        } else {
          this.items.push(dashboard);
        }
        this.items.push({ separator: true });
        // this.items.push(programLinks);
      }
      this.items.push(info);
      if (authenticated) {
        this.items.push({ separator: true });
        this.current_user = this.session.getCurrentUser();
        if (this.current_user) {
          this.fullName = this.current_user.userName;
        }

        let logout = {
          label: `Logged in as ` + this.fullName,
          icon: 'pi pi-fw pi-user',
          items: [
            { label: 'User Profile', icon: 'pi pi-inbox', routerLink: ['/user-profile'] },
            { label: 'Change Password', icon: 'pi pi-inbox', routerLink: ['/user-profile/change-password'] },
            { label: 'Security Questions', icon: 'pi pi-inbox', routerLink: ['/user-profile/security-questions'] },
            { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
          ]
        };

        this.items.push(logout);
      }
    });
  }

  toggle() {
    this.toggleBanner = !this.toggleBanner;
    this.renderer.setAttribute(this.headerButton.nativeElement, 'aria-expanded', this.toggleBanner + '');
    this.renderer.setAttribute(this.headerArea.nativeElement, 'aria-hidden', (!this.toggleBanner) + '');
  }

  menuClick() {
    this.renderer.addClass(this.overlay.nativeElement, 'is-visible');
    this.renderer.addClass(this.navigator.nativeElement, 'is-visible');
    this.renderer.removeStyle(this.navigator.nativeElement, 'height');
  }

  menuClose() {
    this.renderer.removeClass(this.overlay.nativeElement, 'is-visible');
    this.renderer.removeClass(this.navigator.nativeElement, 'is-visible');
    this.renderer.setStyle(this.navigator.nativeElement, 'height', '50px');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 951) {
      this.renderer.removeClass(this.overlay.nativeElement, 'is-visible');
      this.renderer.removeClass(this.navigator.nativeElement, 'is-visible');
    }
  }

  viewUserGuide() {
    window.open(this.environmentUrl + '/?q=user-guide/edi-user-guide', '_blank');
  }

  async logout() {
    // do session.logout always before authService.logout
    await this.session.logout(false).finally(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
    });
  }
}
