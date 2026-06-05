import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { Router } from '@angular/router';
import { MessagesServices } from '../../../../core/messages/messages-services';

@Component({
  selector: 'app-employee-add',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-add.html',
  styleUrl: './employee-add.css',
})
export class EmployeeAdd {
  private fb = inject(FormBuilder);

  private employeeService = inject(EmployeeService);

  private router = inject(Router);

  private messageService = inject(MessagesServices)
  employeeForm = this.fb.group({

    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-z ]+$/)
      ]
    ],

    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-z ]+$/)
      ]
    ],

    email: [
      '',
      [Validators.required, Validators.email]
    ],

    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]
    ],

    department: [
      '',
      Validators.required
    ],

    designation: [
      '',
      Validators.required
    ],

    salary: [
      null,
      [
        Validators.required,
        Validators.min(1000)
      ]
    ],

    joiningDate: [
      '',
      Validators.required
    ],

    status: [
      'Active',
      Validators.required
    ]

  });

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.employeeForm.value,
      accountCreated: false
    }
    
    this.employeeService.addEmployee(payload as any).subscribe({
      next: () => {
        this.messageService.success('Employee Added Successfully');
        this.router.navigate(['/admin/employess']);
      },
      error: (err) => {
        console.log(err);
        this.messageService.error('Failed to add employee');
      }
    });
  }

}
