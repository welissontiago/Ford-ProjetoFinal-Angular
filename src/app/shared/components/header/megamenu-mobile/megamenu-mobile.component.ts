import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-megamenu-mobile',
  imports: [MatListModule, MatIconModule, CommonModule],
  templateUrl: './megamenu-mobile.component.html',
  styleUrl: './megamenu-mobile.component.css',
})
export class MegamenuMobileComponent {
  isServicosOpen = false;

  openAccordion: 'meuFord' | 'tecnologia' | null = null;

  toggleServicos() {
    this.isServicosOpen = !this.isServicosOpen;
    if (!this.isServicosOpen) {
      this.openAccordion = null;
    }
  }

  toggleAccordion(accordion: 'meuFord' | 'tecnologia') {
    if (this.openAccordion === accordion) {
      this.openAccordion = null;
    } else {
      this.openAccordion = accordion;
    }
  }
}
