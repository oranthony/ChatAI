import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionsService } from 'src/app/common/services/suggestions.service';

//TODO: check documentation to see if null is better than 0 when init with no value
export const mySignal = signal(null);

@Component({
  selector: 'app-message-suggestions',
  templateUrl: './message-suggestions.component.html',
  styleUrl: './message-suggestions.component.scss'
})
export class MessageSuggestionsComponent implements OnChanges {
  // List of message suggestions send from parent container
  @Input() messageSuggestionsList: string[] = [];
  // Specify the container from where the suggestion originated (ex: chatbot-container, picture-gen-container...)
  // Used when send notification through the service to the right parent container
  @Input() suggestionOrigin!: string;
  @Output() suggestionClicked = new EventEmitter();
  isSuggestionsShowed: boolean = true;

  private suggestionSelected: string = "";
  private suggestion = {message: this.suggestionSelected, target: this.suggestionOrigin};

  
  //mySignal = signal(this.suggestion);

  constructor(private elementRef: ElementRef, private suggestionService: SuggestionsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // If user send a message instead of clicking on a suggestion at start
    if (this.messageSuggestionsList.length == 0) {
      this.isSuggestionsShowed = false;
    }
  }

  onSuggestionClick(suggestion: string) {
    // Hide suggestions
    this.isSuggestionsShowed = false;

    this.suggestionSelected = suggestion;

    // Notify top parent container using SuggestionService
    this.suggestionService.notify(suggestion, this.suggestionOrigin);
  }
}
