import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { Employee } from '../../../../models/employee.model';
import { Router } from '@angular/router';
import { MessagesServices } from '../../../../core/messages/messages-services';
import { computed } from '@angular/core';
import { RecentEmployee } from "../../components/recent-employee/recent-employee";

@Component({
  selector: 'app-employee-list',
  imports: [RecentEmployee],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  private employeeService = inject(EmployeeService)
  private router = inject(Router)
  private messageservice = inject(MessagesServices)

  currentPage = signal(1);
  pageSize = 5;
  loading = signal(false);
  employees = signal<Employee[]>([]);
  filteredEmployees = signal<Employee[]>([]);
  searchTerm = signal('');
  selectedDepartment = signal('');
  selectedStatus = signal('');

  ngOnInit() {
    this.loadEmployees()
  }

  paginatedEmployees = computed(() => {
    let start = (this.currentPage() - 1) * this.pageSize
    let end = start + this.pageSize
    return this.filteredEmployees().slice(start, end)
  })

  totalPages = computed(() =>
    Math.ceil(this.filteredEmployees().length / this.pageSize)
  )

  previousPage() {
    this.loading.set(true)
    if (this.currentPage() > 1) {
      setTimeout(() => {
        this.loading.set(false)
        this.currentPage.update(page => page - 1)
      }, 500)
    }
  }

  nextPage() {
    this.loading.set(true)
    if (this.currentPage() < this.totalPages()) {
      setTimeout(()=>{
        this.loading.set(false)
        this.currentPage.update(page => page + 1);
      },500)
    }
  }

  applyFilters() {

    let filtered = this.employees();

    // Search

    if (this.searchTerm()) {

      let search =
        this.searchTerm().toLowerCase();

      filtered = filtered.filter(emp =>

        emp.firstName.toLowerCase().includes(search)

        ||

        emp.lastName.toLowerCase().includes(search)

        ||

        emp.email.toLowerCase().includes(search)

      );

    }

    // Department

    if (this.selectedDepartment()) {

      filtered = filtered.filter(emp =>
        emp.department === this.selectedDepartment()
      );

    }

    // Status

    if (this.selectedStatus()) {

      filtered = filtered.filter(emp =>
        emp.status ===
        this.selectedStatus()
      );

    }

    this.currentPage.set(1);
    this.filteredEmployees.set(filtered);
  }

  onSearch(event: Event) {
    this.loading.set(true);
    let value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value)
    setTimeout(() => {
      this.applyFilters()
      this.loading.set(false)
    }, 500);
  }

  onDepartmentChange(event: Event) {
    this.loading.set(true);
    let value = (event.target as HTMLSelectElement).value;
    this.selectedDepartment.set(value)
    setTimeout(() => {
      this.applyFilters()
      this.loading.set(false)
    }, 500);
  }

  onStatusChange(event: Event) {
    this.loading.set(true);
    let value = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(value)
    setTimeout(() => {
      this.applyFilters()
      this.loading.set(false)
    }, 500);
  }

  loadEmployees() {
    this.loading.set(true);
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.employees.set(res);
          this.filteredEmployees.set(res);
          this.loading.set(false);
        }, 1000);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      }
    });
  }

  viewemployee(id: string) {
    this.router.navigate([`/admin/employees/${id}`])
  }

  addemployee() {
    this.router.navigate(['/admin/employees/add'])
  }

  editemployee(id: string) {
    this.router.navigate([`/admin/employees/edit/${id}`])
  }

  deleteEmployee(id: string) {
    this.messageservice.confirmDelete("This employee will be permanently deleted")
      .then(res => {
        if (res.isConfirmed) {
          this.employeeService.deleteEmployee(id).subscribe({
            next: () => {
              this.messageservice.success('Employee deleted successfully');
              this.loadEmployees();
            },
            error: () => {
              this.messageservice.error('Failed to delete employee');
            }
          })
        }
      })
  }
  
  createAccount(id:string){
      this.router.navigate([`/admin/employees/create-account/${id}`])
  }

}
