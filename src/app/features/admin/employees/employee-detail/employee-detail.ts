import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { Employee } from '../../../../models/employee.model';
import { MessagesServices } from '../../../../core/messages/messages-services';

@Component({
  selector: 'app-employee-detail',
  imports: [],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail {
  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);
  employee = signal<Employee | null>(null);
  private router = inject(Router);
  private messageService = inject(MessagesServices)

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe({
        next: (res) => {
          this.employee.set(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin/employess']);
  }

  editEmployee() {
    this.router.navigate(
      ['/admin/employees/edit', this.employee()?.id]
    );
  }

  deleteEmployee() {
    this.messageService.confirmDelete("This employee will be permanently deleted")
      .then(res => {
        if (res.isConfirmed) {
          this.employeeService.deleteEmployee(this.employee()?.id as string).subscribe({
            next: () => {
              this.messageService.success('Employee deleted successfully');
              this.router.navigate(['/admin/employess']);
            },
            error: () => {
              this.messageService.error('Failed to delete employee');
            }
          })
        }
      })
  }
}
