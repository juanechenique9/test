import { computed, Injectable, signal } from '@angular/core';
import { Message } from '../../../interface/messsage.interface';
import { TypeMessage } from '../../../utils/type-message.enum';


@Injectable()
export class MessageService {

   _message = signal<Message | null>(null);

   readonly message = computed(() => this._message());

  showMessage(message: Message){
    if (!message.typeMessage){
      message.typeMessage = TypeMessage.ERROR
    }
    this._message.set(message)
    setTimeout(() => this._message.set(null), 7000);
  }

  showCustomMessage(message: string, typeMessage: TypeMessage){
    this._message.set({
      errorCode: '',
      errorMessage: '',
      errorMessageDisplay: message,
      typeMessage: typeMessage
    })

    setTimeout(() => this._message.set(null), 7000);
  }
}