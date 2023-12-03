import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/common/services/navigation.service';

@Component({
  selector: 'app-title-top-bar',
  templateUrl: './title-top-bar.component.html',
  styleUrls: ['./title-top-bar.component.scss']
})
export class TitleTopBarComponent {
  @Input() title: string = "";
  @Input() modelList!: string[];
  @Input() selectedModel!: Observable<string>;

  // Output selected model
  @Output() choosenModel = new EventEmitter();


  constructor(private navigationService: NavigationService) {}


  openNavBar() {
    this.navigationService.openNavDrawer();
  }
  
  onSelectedModel(model: string) {
    this.choosenModel.emit(model);
  }
}
