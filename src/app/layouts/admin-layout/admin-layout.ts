import { Component } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { RouterOutlet } from '@angular/router';
import { sidebarOpen } from '../../core/state/layout.state';

@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar,Navbar,Footer,RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})

export class AdminLayout {
  sidebarOpen = sidebarOpen;
}
