import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionsService } from 'src/app/common/services/suggestions.service';

@Component({
  selector: 'app-message-suggestions',
  templateUrl: './message-suggestions.component.html',
  styleUrl: './message-suggestions.component.scss'
})
export class MessageSuggestionsComponent implements OnInit {
  // List of message suggestions send from parent container
  @Input() messageSuggestionsList: string[] = [];
  // Specify the container from where the suggestion originated (ex: chatbot-container, picture-gen-container...)
  // Used when send notification through the service to the right parent container
  @Input() suggestionOrigin!: string;
  @Input() isSuggestionsShowed!: boolean;
  //@Output() suggestionClicked = new EventEmitter();
  

  constructor(private elementRef: ElementRef, private suggestionService: SuggestionsService) {}

  ngOnInit() {
    console.log(this.isSuggestionsShowed);
  }

  onSuggestionClick(suggestion: string) {
    // Hide suggestions
    //this.isSuggestionsShowed = false;
    // Notify top parent container using SuggestionService
    this.suggestionService.notify(suggestion, this.suggestionOrigin);
  }
}