import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { authGuard } from './core/guards/auth/auth.guard';
import { adminGuard } from './core/guards/admin/admin.guard';
import { UserLayout } from './layouts/user-layout/user-layout';
import { userGuard } from './core/guards/user/user.guard';
import { loginGuard } from './core/guards/auth/login-guard';

export const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./features/auth/auth.routes').then((a)=>a.AUTH_ROUTES),
    canActivate:[loginGuard]
  },
  {
    path:'admin',
    component:AdminLayout, 
    loadChildren:()=>import('./features/admin/admin.routes').then((a)=>a.ADMIN_ROUTES),
    canActivate:[authGuard,adminGuard]
  },
  {
    path:'user',
    component:UserLayout,
    loadChildren:()=>import('./features/user/user.routes').then((a)=>a.USER_ROUTES),
    canActivate:[authGuard,userGuard]
  }
];
