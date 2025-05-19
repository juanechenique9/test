import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { MessageService } from '../../../core/services/message/message.service';

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  private messageService = inject(MessageService);
  readonly message = this.messageService.message;
}
