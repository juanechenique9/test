import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigateByUrl(`/${route}`);
  }
}
