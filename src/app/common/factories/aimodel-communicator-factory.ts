import { environment } from "src/environments/environment";
import { TextMessageService } from "../services/text-message.service";
import { TextMessage } from "../models/text-message";

/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
export abstract class AiModelCommunicatorCreator {
  /**
   * Note that the Creator may also provide some default implementation of the
   * factory method.
   */
  public abstract factoryMethod(): AiModelCommunicator;

  public parseArguments(message: string): string {
    const product = this.factoryMethod();
    return product.parseArguments(message);
  }

  /**
   * Also note that, despite its name, the Creator's primary responsibility is
   * not creating products. Usually, it contains some core business logic that
   * relies on Product objects, returned by the factory method. Subclasses can
   * indirectly change that business logic by overriding the factory method
   * and returning a different type of product from it.
   */
  public getAPIUrl(): string {
      // Call the factory method to create a Product object.
      const product = this.factoryMethod();
      // Now, use the product.
      return product.getAPIUrl();
  }
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
export class ConcreteBlenderbotCommunicatorCreator extends AiModelCommunicatorCreator {
  /**
   * Note that the signature of the method still uses the abstract product
   * type, even though the concrete product is actually returned from the
   * method. This way the Creator can stay independent of concrete product
   * classes.
   */
  public factoryMethod(): AiModelCommunicator {
      return new ConcreteBlenderbotCommunicator();
  }
}

export class ConcreteLlamaCommunicatorCreator extends AiModelCommunicatorCreator {
  public factoryMethod(): AiModelCommunicator {
      return new ConcreteLlamaCommunicator();
  }
}

export class ConcreteDialogptCommunicatorCreator extends AiModelCommunicatorCreator {
  public factoryMethod(): AiModelCommunicator {
      return new ConcreteDialogptCommunicator();
  }
}

export class ConcreteFalconCommunicatorCreator extends AiModelCommunicatorCreator {
  public factoryMethod(): AiModelCommunicator {
      return new ConcreteFalconCommunicator();
  }
}

/**
 * The Product interface declares the operations that all concrete products must
 * implement.
 */
interface AiModelCommunicator {
  apiUrl: string;
  getAPIUrl(): string;
  parseArguments(message: string): string;
}


/**
 * Concrete Products provide various implementations of the Product interface.
 */
class ConcreteBlenderbotCommunicator implements AiModelCommunicator {
  apiUrl = environment.blenderbotAPIUrl;

  public getAPIUrl(): string {
      return this.apiUrl;
  }

  parseArguments(message: string): string {
    return JSON.stringify(message);
  }
}

class ConcreteLlamaCommunicator implements AiModelCommunicator {
  apiUrl = environment.apiUrl;

  public getAPIUrl(): string {
      return this.apiUrl;
  }

  parseArguments(message: string): string {
    return JSON.stringify(message);
  }
}

class ConcreteDialogptCommunicator implements AiModelCommunicator {
  apiUrl = environment.dialoGptUrl;

  public getAPIUrl(): string {
      return this.apiUrl;
  }

  parseArguments(message: string): string {
    return JSON.stringify(message);
  }
}

class ConcreteFalconCommunicator implements AiModelCommunicator {
  apiUrl = environment.falconUrl;

  public getAPIUrl(): string {
      return this.apiUrl;
  }

  public parseArguments(message: string): string {
    console.log(JSON.stringify({inputs: message}));
    return JSON.stringify({inputs: message});
  }
}