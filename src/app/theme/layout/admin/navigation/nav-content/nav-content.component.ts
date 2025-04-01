// angular import
import { Component, inject, output } from '@angular/core';
import { Location } from '@angular/common';

// project import
import { environment } from 'src/environments/environment';
import { NavigationItem, NavigationItems } from '../navigation';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/indexReducer/indexReducer';

@Component({
  selector: 'app-nav-content',
  imports: [SharedModule, NavGroupComponent],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent {
  private location = inject(Location);

  // public method
  // version
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;

  navigations!: NavigationItem[];
  wrapperWidth: number;
  windowWidth = window.innerWidth;

  NavCollapsedMob = output();

  // constructor
  constructor(private store: Store<AppState>) {
    const finalMenu = [];
    this.store.select('correoInsitucional').subscribe((state) => {
      this.store.select('infoApoderado').subscribe((stateApoderado) => {
        if (stateApoderado.length > 0) {
        const dataApoderado = stateApoderado.filter(data => data.correoInstitucional === state.correoInstitucional);
        const navItems = [];
        navItems.push(NavigationItems);
        for (let i = 0; i < navItems[0].length; i++) {
          if (navItems[0][i].id !== 'administracion' && dataApoderado[0].rolUsuario !== 'admin') {
            finalMenu.push(navItems[0][i]);
          }else if (dataApoderado[0].rolUsuario === 'admin') {
            finalMenu.push(navItems[0][i]);
          }
        }
        this.navigations = finalMenu;
      }
      })
    })
  }

  fireOutClick() {
    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      if (parent.classList.contains('pcoded-hasmenu')) {
        parent.classList.add('pcoded-trigger');
        parent.classList.add('active');
      } else if (up_parent.classList.contains('pcoded-hasmenu')) {
        up_parent.classList.add('pcoded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('pcoded-hasmenu')) {
        last_parent.classList.add('pcoded-trigger');
        last_parent.classList.add('active');
      }
    }
  }
}
