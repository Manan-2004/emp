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

  private messageservice=inject(MessagesServices)

  private employeeService = inject(EmployeeService);

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
    
    this.employeeService.updateEmployee(this.employeeId,this.employeeForm.value as any).
    subscribe({
        next:()=>{
           this.messageservice.success("Employee Updated SuccessFully")
           this.router.navigate(['/admin/employess'])
        },
        error:(err)=>{
           console.log(err)
           this.messageservice.error("Employees Is Not Update please try again")
        }
    })

  }




}
