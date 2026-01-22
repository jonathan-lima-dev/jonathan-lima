import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class App implements AfterViewInit {
  currentYear: number = new Date().getFullYear();
  title = 'Jonathan Lima';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef,
  ) {}

  ngAfterViewInit() {
    // Garante que o código só rode no navegador
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      const elements = this.elementRef.nativeElement.querySelectorAll(
        '.card, h2, #sobre img, #sobre p',
      );

      elements.forEach((el: HTMLElement) => {
        el.classList.add('fade-in-element');
        observer.observe(el);
      });
    }
  }
}
