import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  ImagePath: string;

  isExpanded = true;


  constructor() {
    this.ImagePath = '/assets/logo-short-no-bg.png';
  }

  toggleNav(): void {
    this.isExpanded =! this.isExpanded;
  }

  openNav(): void {
    this.isExpanded =true;
  }

  closeNav(): void {
    this.isExpanded = false;
  }

}
