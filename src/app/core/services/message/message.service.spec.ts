import { TestBed } from '@angular/core/testing';

import { MessageService } from '../../../../app/core/services/message/message.service';
import { TypeMessage } from '../../../utils/type-message.enum';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    jest.useFakeTimers();
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(MessageService);
    service = new MessageService();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should set message with showMessage and clear after 7 seconds', () => {
    const msg = {
      errorCode: '',
      errorMessage: '',
      errorMessageDisplay: 'Test',
      typeMessage: undefined,
    };

    service.showMessage(msg as any);

    expect(service.message()).toEqual(
      expect.objectContaining({
        errorMessageDisplay: 'Test',
        typeMessage: TypeMessage.ERROR,
      })
    );

    jest.advanceTimersByTime(7000);

    expect(service.message()).toBeNull();
  });

  it('should set message with showCustomMessage and clear after 7 seconds', () => {
    service.showCustomMessage('Mensaje personalizado', TypeMessage.INFO);

    expect(service.message()).toEqual({
      errorCode: '',
      errorMessage: '',
      errorMessageDisplay: 'Mensaje personalizado',
      typeMessage: TypeMessage.INFO,
    });

    jest.advanceTimersByTime(7000);

    expect(service.message()).toBeNull();
  });
});
