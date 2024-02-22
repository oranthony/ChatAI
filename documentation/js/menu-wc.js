'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">chat-ai documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-ecb271987ef20851c67ea0393ac6e4342d25e333fa0dd95066f3fe9b3268c583f3d31a34bac3d9742a7d5f740fe50e78807833cbe2c589a336c44d084871a665"' : 'data-bs-target="#xs-components-links-module-AppModule-ecb271987ef20851c67ea0393ac6e4342d25e333fa0dd95066f3fe9b3268c583f3d31a34bac3d9742a7d5f740fe50e78807833cbe2c589a336c44d084871a665"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ecb271987ef20851c67ea0393ac6e4342d25e333fa0dd95066f3fe9b3268c583f3d31a34bac3d9742a7d5f740fe50e78807833cbe2c589a336c44d084871a665"' :
                                            'id="xs-components-links-module-AppModule-ecb271987ef20851c67ea0393ac6e4342d25e333fa0dd95066f3fe9b3268c583f3d31a34bac3d9742a7d5f740fe50e78807833cbe2c589a336c44d084871a665"' }>
                                            <li class="link">
                                                <a href="components/AiModelDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AiModelDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatbotContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatbotContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorMessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingMessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageBoxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageBoxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageSuggestionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageSuggestionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PictureGenContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PictureGenContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidenavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TitleTopBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TitleTopBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AiModelCommunicatorCreator.html" data-type="entity-link" >AiModelCommunicatorCreator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteBlenderbot3BCommunicator.html" data-type="entity-link" >ConcreteBlenderbot3BCommunicator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteBlenderbot3BCommunicatorCreator.html" data-type="entity-link" >ConcreteBlenderbot3BCommunicatorCreator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteBlenderbotCommunicator.html" data-type="entity-link" >ConcreteBlenderbotCommunicator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteBlenderbotCommunicatorCreator.html" data-type="entity-link" >ConcreteBlenderbotCommunicatorCreator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteDialogptCommunicator.html" data-type="entity-link" >ConcreteDialogptCommunicator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteDialogptCommunicatorCreator.html" data-type="entity-link" >ConcreteDialogptCommunicatorCreator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteFalconCommunicator.html" data-type="entity-link" >ConcreteFalconCommunicator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteFalconCommunicatorCreator.html" data-type="entity-link" >ConcreteFalconCommunicatorCreator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteLlamaCommunicator.html" data-type="entity-link" >ConcreteLlamaCommunicator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteLlamaCommunicatorCreator.html" data-type="entity-link" >ConcreteLlamaCommunicatorCreator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteOpenjourneyCommunicator.html" data-type="entity-link" >ConcreteOpenjourneyCommunicator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteOpenjourneyCommunicatorCreator.html" data-type="entity-link" >ConcreteOpenjourneyCommunicatorCreator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteStableDiffusion1_5Communicator.html" data-type="entity-link" >ConcreteStableDiffusion1_5Communicator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteStableDiffusion1_5CommunicatorCreator.html" data-type="entity-link" >ConcreteStableDiffusion1_5CommunicatorCreator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteStableDiffusionXLCommunicator.html" data-type="entity-link" >ConcreteStableDiffusionXLCommunicator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConcreteStableDiffusionXLCommunicatorCreator.html" data-type="entity-link" >ConcreteStableDiffusionXLCommunicatorCreator</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ChatbotEffects.html" data-type="entity-link" >ChatbotEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelDetailsService.html" data-type="entity-link" >ModelDetailsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationService.html" data-type="entity-link" >NavigationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PictureGenEffects.html" data-type="entity-link" >PictureGenEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PictureMessageService.html" data-type="entity-link" >PictureMessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResourceService.html" data-type="entity-link" >ResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SuggestionsService.html" data-type="entity-link" >SuggestionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TextMessageService.html" data-type="entity-link" >TextMessageService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AiModelCommunicator.html" data-type="entity-link" >AiModelCommunicator</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Model.html" data-type="entity-link" >Model</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Models.html" data-type="entity-link" >Models</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PictureMessage.html" data-type="entity-link" >PictureMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-1.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TextMessage.html" data-type="entity-link" >TextMessage</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});