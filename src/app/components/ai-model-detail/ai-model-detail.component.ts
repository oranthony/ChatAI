import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelDetailsService } from 'src/app/common/services/model-details.service';
import { Model, Models } from 'src/app/common/models/ai-model-details';

@Component({
  selector: 'app-ai-model-detail',
  templateUrl: './ai-model-detail.component.html',
  styleUrls: ['./ai-model-detail.component.scss']
})
export class AiModelDetailComponent implements OnInit {

  descriptionsections: string[] = [];
  //models!: Models;
  selectedModel!: Model;
  blenderBotModel!: Model;
  LLaMAModel!: Model;

  constructor(private modelDetailsService: ModelDetailsService) {
    //TODO: add model by input
  }

  ngOnInit() {
    console.log("init");
    this.modelDetailsService.getJSON().subscribe(data => {
      this.bindLocalData(data)
      this.selectedModel = this.blenderBotModel;
    })
  }

  bindLocalData(modelList: Models) {
    console.log("bind");
    modelList.models.forEach(model => {
      if (model.name == "BlenderBot") {
        this.blenderBotModel = model;
      }

      if (model.name == "LLaMA") {
        this.LLaMAModel = model;
      }
    });

    console.log(this.blenderBotModel);
    console.log(this.LLaMAModel);
  }

}
