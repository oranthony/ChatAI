import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationService } from '../common/services/navigation.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  ImagePath: string;
  openEventsubscription: Subscription;
  isExpanded = true;


  constructor(private navigationService: NavigationService) {
    this.ImagePath = '/assets/logo-short-no-bg.png';
    this.openEventsubscription = this.navigationService.getOpenNavDrawerEvent().subscribe(()=>{
      this.openNav();
      })
  }

  toggleNav(): void {
    this.isExpanded =! this.isExpanded;
  }

  openNav(): void {
    this.isExpanded = true;
  }

  closeNav(): void {
    this.isExpanded = false;
  }



}
