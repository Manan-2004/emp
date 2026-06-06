import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = localStorage.getItem('user');

  if (user) {

    const currentUser = JSON.parse(user);

    if (currentUser.role === 'admin') {

      router.navigate(['/admin/dashboard']);

    } else {

      router.navigate(['/user/dashboard']);

    }

    return false;
  }

  return true;
};
