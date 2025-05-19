import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { TypeMessage } from '../../../utils/type-message.enum';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() description!: string;
  @Input() type: TypeMessage = TypeMessage.ERROR;

}
