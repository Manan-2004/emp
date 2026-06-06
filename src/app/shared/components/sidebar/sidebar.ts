import { Component } from '@angular/core';
import { currentUser } from '../../../core/state/auth.state';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { sidebarOpen } from '../../../core/state/layout.state';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  user = currentUser

  sidebarOpen = sidebarOpen
}
