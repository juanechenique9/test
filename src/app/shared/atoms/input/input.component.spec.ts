import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextComponent } from '../../../../app/shared/atoms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [InputTextComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onInput and update value', () => {
    const inputEl = fixture.debugElement.query(By.css('input'));
    const inputNative: HTMLInputElement = inputEl.nativeElement;

    const onChangeSpy = jest.spyOn(component, 'onChange');

    inputNative.value = 'Test value';
    inputEl.triggerEventHandler('input', { target: inputNative });

    expect(component.value).toBe('Test value');
    expect(onChangeSpy).toHaveBeenCalledWith('Test value');
  });

  it('should call onBlur and set isTouched', () => {
    const onTouchedSpy = jest.spyOn(component, 'onTouched');

    const inputEl = fixture.debugElement.query(By.css('input'));
    inputEl.triggerEventHandler('blur', null);

    expect(component.isTouched).toBe(true);
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
