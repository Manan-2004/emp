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

    firstName: ['', Validators.required],

    lastName: ['', Validators.required],

    email: ['', [Validators.required, Validators.email]],

    phone: ['', Validators.required],

    department: ['', Validators.required],

    designation: ['', Validators.required],

    salary: [0, Validators.required],

    joiningDate: ['', Validators.required],

    status: ['Active', Validators.required]

  });

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      this.messageService.warning('Please Fill The Form');
      return;
    }

    this.employeeService.addEmployee(this.employeeForm.value as any).subscribe({
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
