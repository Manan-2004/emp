import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { UserService } from '../../../core/services/auth/user.service';
import { MessagesServices } from '../../../core/messages/messages-services';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css',
})
export class CreateAccount {
  private fb = inject(FormBuilder);

  private route = inject(ActivatedRoute);

  private employeeService = inject(EmployeeService);

  private userService = inject(UserService);

  private router = inject(Router);

  private messageService = inject(MessagesServices);

  employee = signal<Employee | null>(null);

  employeeId = '';

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.loadEmployee()
  }

  loadEmployee() {
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (res) => {
        this.employee.set(res);
        this.accountForm.patchValue({
          username: `${res.firstName.toLowerCase()}${res.lastName.toLowerCase()}`
        });
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  accountForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9._]+$/)
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
      ]
    ],

    role: [
      'user',
      Validators.required
    ]
  });

  get f() {
    return this.accountForm.controls;
  }

  saveAccount() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    let emp = this.employee()
    if (!emp)
      return

    let payload = {
      employeeId: emp.id,

      username: this.accountForm.value.username!,

      password: this.accountForm.value.password!,

      role: this.accountForm.value.role!,

      email: emp.email,

      name: `${emp.firstName} ${emp.lastName}`
    }

    this.userService.createUser(payload as any).subscribe({
      next: () => {
        let updatedEmployee = { ...emp, accountCreated: true };
        this.employeeService.updateEmployee(emp.id, updatedEmployee).subscribe({
          next: () => {
            this.messageService.success('Account Created Successfully');
            this.router.navigate(['/admin/employess'])
          },
          error: (err) => {
            console.log(err)
          }
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
