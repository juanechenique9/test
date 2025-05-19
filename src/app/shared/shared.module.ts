import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  InputTextComponent,
  SelectDropdownComponent,
  TabletComponent,
} from '../../app/shared/atoms';
import { ModalComponent } from './molecules/modal/modal.component';
import { MessageComponent } from './molecules/message/message.component';

@NgModule({
  declarations: [
    TabletComponent,
    InputTextComponent,
    SelectDropdownComponent,
    ModalComponent,
    MessageComponent
  ],
  exports: [
    TabletComponent,
    InputTextComponent,
    SelectDropdownComponent,
    ModalComponent,
    MessageComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ScrollingModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
