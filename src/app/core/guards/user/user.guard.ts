import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userStr = localStorage.getItem('user');

  if (!userStr) {
    router.navigate(['/']);
    return false;
  }

  const user = JSON.parse(userStr);

  if (user.role === 'user') {
    return true;
  }

  router.navigate(['/admin/dashboard']);
  return false;
};
