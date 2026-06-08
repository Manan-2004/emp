import { Component, inject, signal } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../core/services/auth/user.service';
import { MessagesServices } from '../../../core/messages/messages-services';
import { EmployeeService } from '../../../core/services/employee/employee.service';


@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})

export class Users {
  private userService = inject(UserService);

  private messageService = inject(MessagesServices);
  private employeeService = inject(EmployeeService)

  users = signal<User[]>([]);
  filteredUsers = signal<User[]>([]);

  searchTerm = signal('');
  selectedRole = signal('');

  loading = signal(false);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {

    this.loading.set(true);

    this.userService.getUsers()
      .subscribe({

        next: (res) => {
          setTimeout(() => {
            this.users.set(res);

            this.filteredUsers.set(res);

            this.loading.set(false);
          }, 500)
        },

        error: (err) => {
          this.loading.set(false);
          console.log(err)
        }

      });

  }

  applyFilters() {

    let filtered =
      this.users();

    if (this.searchTerm()) {

      let search =
        this.searchTerm()
          .toLowerCase();

      filtered =
        filtered.filter(user =>

          user.username
            .toLowerCase()
            .includes(search)

          ||

          user.name
            .toLowerCase()
            .includes(search)

        );

    }

    if (this.selectedRole()) {

      filtered =
        filtered.filter(user =>

          user.role ===
          this.selectedRole()

        );

    }

    this.filteredUsers.set(filtered);

  }

  onSearch(event: Event) {

    let value =
      (event.target as HTMLInputElement)
        .value;

    this.searchTerm.set(value);

    this.applyFilters();

  }

  onRoleChange(event: Event) {

    let value =
      (event.target as HTMLSelectElement)
        .value;

    this.selectedRole.set(value);

    this.applyFilters();

  }

  deleteUser(user: User) {

    if (user.username === 'admin') {

      this.messageService.error(
        'Admin cannot be deleted'
      );

      return;

    }

    this.messageService
      .confirmDelete(
        'Delete this user?'
      )
      .then(res => {

        if (res.isConfirmed) {

          this.userService
            .deleteUser(user.id.toString())
            .subscribe({
              next: () => {
                this.employeeService
                  .getEmployees().subscribe({
                    next: (employees) => {
                      const employee = employees.find(e => e.email === user.email);
                      if (employee) {
                        this.employeeService
                          .updateEmployee(
                            employee.id,
                            {
                              ...employee,
                              accountCreated: false
                            }
                          ).subscribe();
                      }
                    }
                  });

                this.messageService.success(
                  'User deleted successfully'
                );

                this.loadUsers();

              }

            });

        }

      });

  }


  resetPassword(user: User) {

    this.messageService.confirmDelete(
      'Reset Password?',
      `Are you sure you want to reset password for ${user.username}?`,
      "Reset"
    )
      .then(res => {

        if (res.isConfirmed) {

          const updatedUser = {
            ...user,
            password: '123456'
          };

          this.userService
            .updateUser(
              user.id.toString(),
              updatedUser
            )
            .subscribe({

              next: () => {

                this.messageService.success(
                  `Password reset successfully.
             New Password: 123456`
                );

              }

            });

        }

      });
  }

}
