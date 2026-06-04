import { Component } from '@angular/core';
import { currentUser } from '../../../core/state/auth.state';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
   user = currentUser;
   
}
