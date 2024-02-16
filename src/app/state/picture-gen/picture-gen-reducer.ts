import { Action, createFeature, createReducer, on } from '@ngrx/store';
import * as PictureGenActions from './picture-gen.actions';
import { LoadingMessageState, MessageState, SuccessMessageState } from 'src/app/common/models/message-state';
import { TextMessage } from 'src/app/common/models/text-message';
import { textToImageModelsName } from 'src/environments/environment';
import { PictureMessage } from 'src/app/common/models/picture-message';

export const pictureGenFeatureKey = 'pictureGen';

const successMessageState: SuccessMessageState = { state: "Success" };
const loadingMessageState: LoadingMessageState = { state: "Loading" };

export interface State {
  aiModelName: string;
  messageState: MessageState;
  messageList: (TextMessage | PictureMessage)[];
  isNewConversation: boolean;
}

export const initialState: State = {
  aiModelName: textToImageModelsName.OPENJOURNEY,
  messageState: successMessageState,
  messageList: [],
  // Used to know if suggestions should be displayed (they are dipslayed only for new conversations)
  isNewConversation: true
};

export const pictureGenFeature = createFeature({
  name: "pictureGen",
  reducer: createReducer(
    initialState,
    on(PictureGenActions.askAnswerAI, state => ({ ...state, messageState: loadingMessageState })),
    on(PictureGenActions.addAnswerAI, (state, { pictureMessage }) => ({ ...state, messageList: [...state.messageList, pictureMessage], messageState: successMessageState })),
    on(PictureGenActions.addAnswerAIError, (state, { errorMessageState }) => ({ ...state, messageState: errorMessageState })),
    on(PictureGenActions.addUserQuestion, (state, { textMessage }) => ({ ...state, messageList: [...state.messageList, textMessage], isNewConversation: false })),
    on(PictureGenActions.setAiModelName, (state, { aiModelName }) => ({ ...state, aiModelName: aiModelName })),
  ),
});

export const {
  name: _pictureGenFeatureKey,
  reducer: pictureGenReducer,
  selectMessageList,
  selectMessageState,
  selectAiModelName,
  selectIsNewConversation
} = pictureGenFeature;
