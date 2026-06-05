import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./admindashboard/admindashboard').then(a => a.Admindashboard)
    },
    {
        path: 'employess',
        loadComponent: () => import('./employees/employee-list/employee-list').then(a => a.EmployeeList)
    },
    {
        path: 'employees/add',
        loadComponent: () => import('./employees/employee-add/employee-add').then(a => a.EmployeeAdd)
    },
    {
        path: 'employees/edit/:id',
        loadComponent: () => import('./employees/employee-edit/employee-edit').then(a => a.EmployeeEdit)
    },
    {
        path: 'employees/:id',
        loadComponent: () => import('./employees/employee-detail/employee-detail').then(a => a.EmployeeDetail)
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile').then(a => a.Profile)
    },
    {
        path:'employees/create-account/:id',
        loadComponent:()=>import("./create-account/create-account").then(a=>a.CreateAccount)
    },
    {
         path:'users',
         loadComponent:()=>import("./users/users").then(a=>a.Users)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
]