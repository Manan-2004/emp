import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessagesServices {

  success(message: string, title: string = 'Success') {
    Swal.fire({
      icon: 'success',
      title,
      text: message,
      timer: 2000,
      showConfirmButton: false
    });
  }

  error(message: string, title: string = 'Error') {
    Swal.fire({
      icon: 'error',
      title,
      text: message,
      timer: 3000,
      showConfirmButton: true
    });
  }

  warning(message: string, title: string = 'Warning') {
    Swal.fire({
      icon: 'warning',
      title,
      text: message
    });
  }

  confirmDelete(message: string = 'Are you sure you want to delete this?') {
    return Swal.fire({
      title: 'Confirm Delete',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });
  }
}
