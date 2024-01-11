import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSuggestionsComponent } from './message-suggestions.component';

describe('MessageSuggestionsComponent', () => {
  let component: MessageSuggestionsComponent;
  let fixture: ComponentFixture<MessageSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSuggestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
