import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDropdownComponent } from '../../../../app/shared/atoms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SelectDropdwonComponent', () => {
  let component: SelectDropdownComponent;
  let fixture: ComponentFixture<SelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [SelectDropdownComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    

    fixture = TestBed.createComponent(SelectDropdownComponent);
    component = fixture.componentInstance;

    component.options = [
      { label: 'Option 1', value: 'value1' },
      { label: 'Option 2', value: 'value2' },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSelect and update the value', () => {
    const selectEl = fixture.debugElement.query(By.css('select'));
    const selectNative: HTMLSelectElement = selectEl.nativeElement;


    const onChangeSpy = jest.spyOn(component, 'onChange');

    selectNative.value = selectNative.options[1].value;
    selectEl.triggerEventHandler('change', { target: selectNative });

    expect(component.value).toBe('value1');
    expect(onChangeSpy).toHaveBeenCalledWith('value1');
  });

  it('should call onBlur and set isTouched to true', () => {
    const onTouchedSpy = jest.spyOn(component, 'onTouched');

    const selectEl = fixture.debugElement.query(By.css('select'));
    selectEl.triggerEventHandler('blur', null);

    expect(component.isTouched).toBe(true);
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
