import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <nav class="navbar sticky top-0 z-50 bg-white shadow-sm">
      <div class="nav-container">
        <div class="nav-content">
          <div class="nav-left">
            <div class="logo-container">
              <a routerLink="" class="nav-logo">Aptitude Test</a>
            </div>
            <div class="nav-links">
              <div class="nav-links-container">
                <a routerLink="quotes" class="nav-link" routerLinkActive="nav-link-active">Quotes</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: `
    .navbar {
      background-color: #1f2937;
    }

    .nav-container {
      margin-left: auto;
      margin-right: auto;
      max-width: 80rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    @media (min-width: 640px) {
      .nav-container {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    }

    @media (min-width: 1024px) {
      .nav-container {
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }

    .nav-content {
      position: relative;
      display: flex;
      height: 4rem;
      align-items: center;
      justify-content: space-between;
    }

    .nav-left {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
    }

    @media (min-width: 640px) {
      .nav-left {
        justify-content: flex-start;
      }
    }

    .logo-container {
      display: flex;
      flex-shrink: 0;
      align-items: center;
    }

    .nav-logo {
      font-size: 1.875rem;
      font-weight: 700;
      background: linear-gradient(to right, #3b82f6, #ffffff);
      -webkit-background-clip: text;
      color: transparent;
    }

    .nav-links {
      display: none;
    }

    @media (min-width: 640px) {
      .nav-links {
        display: block;
        margin-left: 1.5rem;
      }
    }

    .nav-links-container {
      display: flex;
      gap: 1rem;
    }

    .nav-link {
      text-decoration: none;
      border-radius: 0.375rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #d1d5db;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }

    .nav-link:hover {
      background-color: #374151;
      color: #ffffff;
    }

    .nav-link-active {
      background-color: #374151;
      color: #ffffff;
    }
  `
})
export class NavBar {}
