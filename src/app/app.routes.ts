import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loggedInGuard } from './core/guards/logged-in.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loggedInGuard],
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [loggedInGuard],
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'inventario',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/inventario/inventario.component').then(
        (m) => m.InventarioComponent
      ),
  },

  {
    path: 'veiculo/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/detalhes-veiculo/detalhes-veiculo.component').then(
        (m) => m.DetalhesVeiculoComponent
      ),
  },

  {
    path: 'pagamento/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/pagamento/pagamento.component').then(
        (m) => m.PagamentoComponent
      ),
  },

  {
    path: 'dashboard',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      { path: '', redirectTo: 'dashboard-home', pathMatch: 'full' },
      {
        path: 'dashboard-home',
        loadComponent: () =>
          import(
            './components/admin/dashboard-home/dashboard-home.component'
          ).then((m) => m.DashboardHomeComponent),
      },
      {
        path: 'veiculos',
        loadComponent: () =>
          import('./components/admin/veiculos/veiculos.component').then(
            (m) => m.VeiculosComponent
          ),
      },
      {
        path: 'propostas',
        loadComponent: () =>
          import('./components/admin/propostas/propostas.component').then(
            (m) => m.PropostasComponent
          ),
      },
      {
        path: 'relatorios',
        loadComponent: () =>
          import('./components/admin/relatorios/relatorios.component').then(
            (m) => m.RelatoriosComponent
          ),
      },
      {
        path: 'veiculos/edit/:id',
        loadComponent: () =>
          import(
            './components/admin/veiculos/vehicle-edit/vehicle-edit.component'
          ).then((m) => m.VehicleEditComponent),
      },
      {
        path: 'veiculos/add',
        loadComponent: () =>
          import(
            './components/admin/veiculos/add-vehicle/add-vehicle.component'
          ).then((m) => m.AddVehicleComponent),
      },
    ],
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
