import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleTopBarComponent } from './title-top-bar.component';

describe('TitleTopBarComponent', () => {
  let component: TitleTopBarComponent;
  let fixture: ComponentFixture<TitleTopBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitleTopBarComponent]
    });
    fixture = TestBed.createComponent(TitleTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
