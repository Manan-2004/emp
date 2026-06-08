import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessagesServices {

  private toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,

    didOpen: (toast) => {

      toast.addEventListener(
        'mouseenter',
        Swal.stopTimer
      );

      toast.addEventListener(
        'mouseleave',
        Swal.resumeTimer
      );

    }
  });

  success(
    message: string,
    title: string = 'Success'
  ) {
    this.toast.fire({
      icon: 'success',
      title: `${title}`,
      text: message
    });
  }

  error(
    message: string,
    title: string = 'Error'
  ) {
    this.toast.fire({
      icon: 'error',
      title: `${title}`,
      text: message,
      timer: 4000
    });
  }

  warning(
    message: string,
    title: string = 'Warning'
  ) {
    this.toast.fire({
      icon: 'warning',
      title: `${title}`,
      text: message,
      timer: 3500
    });
  }

  info(
    message: string,
    title: string = 'Information'
  ) {
    this.toast.fire({
      icon: 'info',
      title: `${title}`,
      text: message
    });
  }

  confirmDelete(
    title: string = 'Delete Record',
    message: string = 'Are you sure you want to delete this item?',
    buttonText: string = 'Delete'
  ) {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',

      confirmButtonText: buttonText,
      cancelButtonText: 'Cancel',

      reverseButtons: true,

      focusCancel: true
    });
  }

  confirmAction(
    title: string,
    message: string,
    buttonText: string = 'Yes'
  ) {
    return Swal.fire({
      title,
      text: message,
      icon: 'question',

      showCancelButton: true,

      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',

      confirmButtonText: buttonText,
      cancelButtonText: 'Cancel',

      reverseButtons: true
    });
  }
}