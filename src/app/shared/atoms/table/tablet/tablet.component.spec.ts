import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletComponent } from '../../../../../app/shared/atoms/table/tablet/tablet.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TABLEMOCKHEADER, TABLEMOCKROW } from '../../../../mocks/table.mock';
import { TableRow } from '../../../../interface/table.interface';
import { Router } from '@angular/router';


describe('TabletComponent', () => {
  let component: TabletComponent;
  let fixture: ComponentFixture<TabletComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabletComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TabletComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct label for a given header ID', () => {
    component.header = TABLEMOCKHEADER;
    const label = component.getLabel('name');
    expect(label).toBe('Country Name');
  });

  it('should return an empty string for a non-existent header ID', () => {
    component.header = TABLEMOCKHEADER;
    const label = component.getLabel('nonexistent');
    expect(label).toBe('');
  });

  it('should return false for useVirtualScroll when row count is 50 or less', () => {
    component.row = TABLEMOCKROW;
    expect(component.useVirtualScroll).toBeFalsy();
  });

  it('should return true for useVirtualScroll when row count exceeds 50', () => {
    const largeRowSet: TableRow[] = Array.from({ length: 51 }, (_, index) => ({
      id: `${index + 1}`,
      columns: [
        { headerId: 'name', primaryText: `Country ${index + 1}` },
        { headerId: 'region', primaryText: 'Region' },
      ],
    }));
    component.row = largeRowSet;
    expect(component.useVirtualScroll).toBeTruthy();
  });

  it('should emit rowClicked', () => {
    jest.spyOn(component.rowClicked, 'emit');
    jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));
    component.onRowClick(TABLEMOCKROW[0]);
    expect(component.rowClicked.emit).toHaveBeenCalled();
  });

});
