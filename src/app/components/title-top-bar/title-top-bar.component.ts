import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/common/services/navigation.service';

@Component({
  selector: 'app-title-top-bar',
  templateUrl: './title-top-bar.component.html',
  styleUrls: ['./title-top-bar.component.scss']
})
export class TitleTopBarComponent {
  @Input() title: string = "";

  constructor(private navigationService: NavigationService) {
    
  }

  openNavBar() {
    console.log("yes");
    this.navigationService.openNavDrawer();
  }
}
