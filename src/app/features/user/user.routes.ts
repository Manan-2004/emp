import { Routes } from "@angular/router";

export const USER_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./userdashboard/userdashboard').then((u) => u.Userdashboard)
    },
    {
        path: 'employees',
        loadComponent: () => import('./employee-list/employee-list').then((u) => u.EmployeeList)
    },
    {
        path: 'employees/:id',
        loadComponent: () => import('./employee-detail/employee-detail').then(a => a.EmployeeDetail)
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile').then(a => a.Profile)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
];