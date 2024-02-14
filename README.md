# ChatAI with Angular, Component Driven Architecture, Container & Presentational Components, RxJS, NgRx

This is a chatbot using Facebook BlenderBot (400M) and soon LLaMA.

Hosted on : https://chat.loroscio.com/

## List of features

- Chatbot with Facebook BlenderBot AI (soon other models)
- Text-to-Picture (generate pictures with text input) using Stable Diffusion (soon)

## Demo Video

https://github.com/oranthony/ChatAI/assets/6161861/46a48633-bfe0-4091-b3f2-88de6998d3b5


## Chatbot

The chatbot feature is bundle within a Container handling all the logic. It sends data to 3 children Presentational Components: Title Bar, Message List and Message Box.

![alt text](/doc/component-architecture.png)

The chatbot features auto-scroll: when a new message is displayed, the list scrolls to the bottom to make it visible. I'm using Angular ViewChild decorator to access the DOM.

## Factory Method Design Pattern

Factory used to abstract API management. Following OPEN/CLOSED principles, adding a new Language Model just require to add its endpoint to the Factory. If later on, we want to allow users to tweak parameters for each Language Model, the Concrete Factory can host the parameters for each Language Model (Temperature, length....).

Factory Pattern can come in handy if down the road we want to add multimodal LLM. This way we would be able to combine multiples LLM and manage each individually.

## State Management with NgRx and Reactive Programming with RxJS

Store split in features, using of effects to send calls to API.

## Generics for the API calls

My main class used to communicate with the API is an abstract class with generics for each type of data manipulated : TextMessage and PictureMessage.

![ChatAI](https://github.com/oranthony/ChatAI/assets/6161861/d75ce678-17dd-4e0e-852f-323777ae17e6)

## Union Type

Custom types for status of message (Loading, Success, Error). Union type to reflect the status of the message. 
![Union-type-1](https://github.com/oranthony/ChatAI/assets/6161861/bd7d14ee-8990-4015-9d80-44b0d5f4dc6a)
![Union-type-2](https://github.com/oranthony/ChatAI/assets/6161861/4bf12b82-f103-4499-917e-57fca628d6d9)

## Responsive Queries

Used to make each container responsive.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

