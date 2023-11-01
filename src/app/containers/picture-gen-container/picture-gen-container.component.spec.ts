import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureGenContainerComponent } from './picture-gen-container.component';

describe('PictureGenContainerComponent', () => {
  let component: PictureGenContainerComponent;
  let fixture: ComponentFixture<PictureGenContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PictureGenContainerComponent]
    });
    fixture = TestBed.createComponent(PictureGenContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
