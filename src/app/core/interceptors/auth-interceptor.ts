import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  const publicRoutes = [
    'http://localhost:3000/users'
  ];

  const isPublicRoute = publicRoutes.some(url =>
    req.url.includes(url)
  );

  if (isPublicRoute) {
    return next(req);
  }

  if (!token) {

    localStorage.clear();

    router.navigate(['/login']);

    return next(req);
  }

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(req);
};