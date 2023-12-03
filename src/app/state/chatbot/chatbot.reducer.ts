import { Action, createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as ChatbotActions from './chatbot.actions';
import { MessageState, LoadingMessageState, SuccessMessageState, ErrorMessageState } from 'src/app/common/models/message-state';
import { TextMessage } from 'src/app/common/models/text-message';
import { conversationalModelsName } from 'src/environments/environment';

export const chatbotFeatureKey = 'chatbot';

const successMessageState: SuccessMessageState = { state: "Success" };
const loadingMessageState: LoadingMessageState = { state: "Loading" };

export interface State {
  aiModelName: string;
  messageState: MessageState;
  messageList: TextMessage[];
}

export const initialState: State = {
  aiModelName: conversationalModelsName.BLENDER_BOT,
  messageState: successMessageState,
  messageList: [],
};

export const chatbotFeature = createFeature({
  name: "chatbot",
  reducer: createReducer(
    initialState,
    on(ChatbotActions.askAnswerAI, state => ({ ...state, messageState: loadingMessageState })),
    on(ChatbotActions.addAnswerAI, (state, { textMessage }) => ({ ...state, messageList: [...state.messageList, textMessage], messageState: successMessageState })),
    on(ChatbotActions.addAnswerAIError, (state, { errorMessageState }) => ({ ...state, messageState: errorMessageState })),
    on(ChatbotActions.addUserQuestion, (state, { textMessage }) => ({ ...state, messageList: [...state.messageList, textMessage] })),
    on(ChatbotActions.setAiModelName, (state, { aiModelName }) => ({ ...state, aiModelName: aiModelName })),
  ),
});

export const {
  name: _chatbotFeatureKey,
  reducer: chatbotReducer,
  selectMessageList,
  selectMessageState,
  selectAiModelName
} = chatbotFeature;
