import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: BaseComponent,
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'countries',
        loadChildren: () =>
          import('./list/list.module').then(
            (m) => m.ListModule
          ),
      },
    ],
  },
];
