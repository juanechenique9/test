import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MessageService } from './core/services/message/message.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [MessageService], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
