import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
// import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  {
    path: 'home',
    //canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'inventario',
    //canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/inventario/inventario.component').then(
        (m) => m.InventarioComponent
      ),
  },

  {
    path: 'veiculo/:id',
    loadComponent: () =>
      import('./pages/detalhes-veiculo/detalhes-veiculo.component').then(
        (m) => m.DetalhesVeiculoComponent
      ),
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
