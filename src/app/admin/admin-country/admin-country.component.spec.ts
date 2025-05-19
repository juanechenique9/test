import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCountryComponent } from '../../../app/admin/admin-country/admin-country.component';

describe('AdminCountryComponent', () => {
  let component: AdminCountryComponent;
  let fixture: ComponentFixture<AdminCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCountryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
