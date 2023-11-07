# ChatAI with Angular, Component Driven Architecture, Container & Presentational Components, RxJS, (NgRx soon)

This is a chatbot using Facebook BlenderBot (400M) and soon LLaMA.

Hosted on : https://chat.loroscio.com/

## List of features

- Chatbot with Facebook BlenderBot AI (soon other models)
- Text-to-Picture (generate pictures with text input) using Stable Diffusion (soon)

## Chatbot

The chatbot feature is bundle within a Container handling all the logic. It sends data to 3 children Presentational Components: Title Bar, Message List and Message Box.

![alt text](/doc/component-architecture.png)

The chatbot features auto-scroll: when a new message is displayed, the list scrolls to the bottom to make it visible. I'm using Angular ViewChild decorator to access the DOM.

## Demo Video

https://github.com/oranthony/ChatAI/assets/6161861/ae3eb1b7-a02f-4cf5-a171-3761e7a1aa7a

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

