import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MessageService } from '../services/message/message.service';
import { TypeMessage } from '../../utils/type-message.enum';
import { Message } from '../../interface/messsage.interface';

const UNAUTHORIZEDERROR = '401 UNAUTHORIZED';
@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private messageService: MessageService) {}
  handleError(error: unknown) {
    let errorMessage: Message = {
      errorCode: '',
      errorMessage: '',
      errorMessageDisplay: '',
      typeMessage: TypeMessage.ERROR,
      detailErrorMessage: '',
    };

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        errorMessage = {
          errorCode: '0',
          errorMessage:
            'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
          errorMessageDisplay:
            'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
          typeMessage: TypeMessage.ERROR,
          url: error.url,
        };
      } else if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
        const errorMsg = `Error: ${error.error.message}`;
        errorMessage = {
          errorCode: errorMsg,
          errorMessageDisplay: errorMsg,
          errorMessage: errorMsg,
          typeMessage: TypeMessage.ERROR,
        };
      } else if (
        error.status === 401 ||
        (error.error && error.error.errorMessage === UNAUTHORIZEDERROR)
      ) {
        errorMessage = {
          errorCode: error.status.toString(),
          errorMessageDisplay: 'Su sesión es inválida, recargue la página',
          errorMessage: error.message,
          typeMessage: TypeMessage.ERROR,
          url: error.url,
        };
      } else if (error.error && error.error.errorCode) {
        errorMessage = {
          errorCode: error.error.errorCode,
          errorMessageDisplay: error.error.errorMessageDisplay,
          errorMessage: error.error.errorMessage,
          typeMessage: TypeMessage.ERROR,
        };
      } else {
        const errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        errorMessage = {
          errorCode: error.status.toString(),
          errorMessageDisplay: errorMsg,
          errorMessage: error.message,
          typeMessage: TypeMessage.ERROR,
          url: error.url,
        };
      }
    } else {
      errorMessage = {
        errorMessageDisplay: (error as any).errorMessageDisplay,
        typeMessage: (error as any).typeMessage,
      };
    }

    this.displayMessage(errorMessage);
    this.printMessage(errorMessage);
  }
  displayMessage(errorMessage: Message) {
    console.group('AppError');
    console.error('ErrorCode: ', errorMessage.errorCode);
    console.error('TypeMessage: ', errorMessage.typeMessage);
    console.error('ErrorMessage: ', errorMessage.errorMessage);
    console.error('ErrorMessageDisplay: ', errorMessage.errorMessageDisplay);
    console.error('DetailErrorMessage: ', errorMessage.detailErrorMessage);
    console.groupEnd();
  }
  printMessage(errorMessage: Message) {
    this.messageService.showMessage(errorMessage);
  }
}
