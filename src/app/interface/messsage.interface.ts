import { TypeMessage } from "../utils/type-message.enum";

export interface Message {
    errorCode?: string;
    errorMessage?: string;
    errorMessageDisplay: string,
    typeMessage?: TypeMessage;
    url?: string | null;
    detailErrorMessage?: string;

}

export class ErrorMessage implements Message {

  constructor(errorMessageDisplay: string, typeMessage: TypeMessage) {

    this.errorMessageDisplay = errorMessageDisplay
    this.typeMessage = typeMessage
  }

  errorMessageDisplay = '';
  typeMessage: TypeMessage;
}
