import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelDetailsService } from 'src/app/common/services/model-details.service';
import { Model, Models } from 'src/app/common/models/ai-model-details';
import { modelsName } from 'src/environments/environment.development';

@Component({
  selector: 'app-ai-model-detail',
  templateUrl: './ai-model-detail.component.html',
  styleUrls: ['./ai-model-detail.component.scss']
})
export class AiModelDetailComponent implements OnInit {

  @Input() selectedModelName!: string;
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
      this.bindLocalData(data)
      this.selectedModel = this.blenderBotModel;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    // Detect when user select a different model
    if (changes['selectedModelName'].previousValue != changes['selectedModelName'].currentValue) {
      // Change selectedModelName with new model name
      this.changeSelectedModel(changes["selectedModelName"].currentValue);
    }
    
  }

  // Assign model data stored in asset to local variables.
  bindLocalData(modelList: Models) {
    modelList.models.forEach(model => {
      //TODO: change manual binding to map through the modelList automatically
      if (model.name == modelsName.BLENDER_BOT) {
        this.blenderBotModel = model;
      }

      if (model.name == modelsName.BLENDER_BOT_3B) {
        this.blenderBot3BModel = model;
      }

      if (model.name == modelsName.DIALOGPT) {
        this.dialoGptModel = model;
      }

      /*if (model.name == modelsName.LLAMA) {
        this.LLaMAModel = model;
      }*/
    });
  }

  // Change current model
  changeSelectedModel(model: string) {
    if (model == modelsName.BLENDER_BOT) {
      this.selectedModel = this.blenderBotModel;
    }

    if(model == modelsName.BLENDER_BOT_3B) {
      this.selectedModel = this.blenderBot3BModel;
    }

    if(model == modelsName.DIALOGPT) {
      this.selectedModel = this.dialoGptModel;
    }


    /*if (model == modelsName.LLAMA) {
      this.selectedModel = this.LLaMAModel;
    }*/
  }

}
