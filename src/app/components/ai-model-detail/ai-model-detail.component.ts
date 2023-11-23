import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelDetailsService } from 'src/app/common/services/model-details.service';
import { Model, Models } from 'src/app/common/models/ai-model-details';
import { conversationalModelsName } from 'src/environments/environment.development';

@Component({
  selector: 'app-ai-model-detail',
  templateUrl: './ai-model-detail.component.html',
  styleUrls: ['./ai-model-detail.component.scss']
})
export class AiModelDetailComponent implements OnInit {

  @Input() selectedModelName!: string;
  modelList!: Models;
  selectedModel!: Model;
  blenderBotModel!: Model;
  blenderBot3BModel!: Model;
  LLaMAModel!: Model;
  dialoGptModel!: Model;

  constructor(private modelDetailsService: ModelDetailsService) {
  }

  ngOnInit() {
    // Load model information from local JSON
    this.modelDetailsService.getJSON().subscribe(data => {
      this.modelList = data;
      // Once all models are loaded we assign the right model
      if (this.selectedModelName) {
        let selectedModel = this.getModelByName(this.selectedModelName);
        if (selectedModel) {
          this.selectedModel = selectedModel;
        }
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    // Detect when user select a different model
    if (changes['selectedModelName'].previousValue != changes['selectedModelName'].currentValue) {
      // Change selectedModelName with new model name. This is triggered always after user change, not at component init.
      if(this.modelList) {
        this.changeSelectedModel(changes["selectedModelName"].currentValue);
      }
    }
  }

  // Change current model
  changeSelectedModel(modelName: string) {
    let selectedModel = this.getModelByName(modelName);
    if (selectedModel) {
      this.selectedModel = selectedModel;
    }
  }

  getModelByName(modelName: string): Model | undefined {
    for (let model of this.modelList.models) {
      if (model.name == modelName) {
        return model;
      }
    }
    // If no model with matching name found return undefined
    return undefined;
  }

}
