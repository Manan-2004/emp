import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { MessagesServices } from '../../../../core/messages/messages-services';

@Component({
  selector: 'app-employee-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css',
})

export class EmployeeEdit {
  employeeId!: string

  ngOnInit() {
    this.employeeId = String(
      this.route.snapshot.paramMap.get('id')
    );
    this.loadEmployee()
  }

  private fb = inject(FormBuilder);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private messageservice = inject(MessagesServices)

  private employeeService = inject(EmployeeService);

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
      [
        Validators.required,
        Validators.email
      ]
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
      0,
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

  viewEmployee() {
    this.router.navigate(
      ['/admin/employees', this.employeeId]
    );
  }

  loadEmployee() {
    this.employeeService
      .getEmployeeById(this.employeeId)
      .subscribe({
        next: (employee) => {
          this.employeeForm.patchValue({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            department: employee.department,
            designation: employee.designation,
            salary: employee.salary,
            joiningDate: employee.joiningDate,
            status: employee.status
          });
        },
        error: (err) => {
          console.log(err)
        }
      });
  }


  updateEmployee() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      this.messageservice.warning("Please Fill The Form")
      return;
    }

    this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value as any).
      subscribe({
        next: () => {
          this.messageservice.success("Employee Updated SuccessFully")
          this.router.navigate(['/admin/employess'])
        },
        error: (err) => {
          console.log(err)
          this.messageservice.error("Employees Is Not Update please try again")
        }
      })

  }
}
