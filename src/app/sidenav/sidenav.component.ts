import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationService } from '../common/services/navigation.service';
import { Subscription } from 'rxjs';
import { HostListener } from "@angular/core";

//TODO: move to env file
const RESPONSIVE_WIDTH = 700;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  imagePath: string;
  homeIconPath: string;
  openEventsubscription: Subscription;
  isExpanded = true;

  screenHeight: number = 0;
  screenWidth: number = 0;
  isMobileSize = false;
  isMobileDrawerOpen = false;


  constructor(private navigationService: NavigationService) {
    this.getScreenSize();
    this.imagePath = '/assets/logo-short-no-bg.png';
    this.homeIconPath = "/assets/icons/home-alt.svg";
    this.openEventsubscription = this.navigationService.getOpenNavDrawerEvent().subscribe(()=>{
      console.log("1");
      this.openNav();
      })
  }
  
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        //console.log(this.screenHeight, this.screenWidth);
        if (this.screenWidth >= RESPONSIVE_WIDTH && this.isMobileSize) {
          this.isMobileSize = false;
          console.log("isMobileSize false");
        }

        if (this.screenWidth < RESPONSIVE_WIDTH && !this.isMobileSize) {
          this.isMobileSize = true;
          console.log("isMobileSize true");
        }
  }

  toggleNav(): void {
    this.isExpanded =! this.isExpanded;
  }

  openNav(): void {
    this.isExpanded = true;
    this.isMobileDrawerOpen = true;
    //this.isMobileSize = false;
  }

  closeNav(): void {
    this.isExpanded = false;
    this.isMobileDrawerOpen = false;
  }

  closeMobileDrawer() {
    this.isMobileDrawerOpen = false;
  }

}
