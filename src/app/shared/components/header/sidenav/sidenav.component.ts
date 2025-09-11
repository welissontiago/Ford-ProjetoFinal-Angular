import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header.component';

interface MenuNode {
  name: string;
  isTree?: boolean;
  children?: MenuNode[];
}

const MOBILE_MENU_DATA: MenuNode[] = [
  { name: 'Veículos' },
  {
    name: 'Serviços',
    isTree: true,
    children: [
      {
        name: 'Serviços',
        children: [
          { name: 'Ford Pós-Venda' },
          { name: 'Recall' },
          { name: 'Ford Protect' },
        ],
      },
      {
        name: 'Meu Ford',
        children: [
          { name: 'Minhas Experiências Ford' },
          { name: 'Agende seu Serviço' },
        ],
      },
      {
        name: 'Tecnologia',
        children: [{ name: 'SYNC®' }, { name: 'FordPass™' }],
      },
    ],
  },
  { name: 'Ofertas' },
  { name: 'Comprar' },
  { name: 'FordPro' },
  { name: 'Iniciar Sessão' },
];

@Component({
  selector: 'app-sidenav',
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    MatTreeModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  menuData = MOBILE_MENU_DATA;
  expandedNodes = new Set<MenuNode>();

  getChildren = (node: MenuNode): MenuNode[] => node.children ?? [];
  hasChild = (_: number, node: MenuNode) =>
    !!node.children && node.children.length > 0;

  toggleNode(node: MenuNode): void {
    if (this.expandedNodes.has(node)) {
      this.expandedNodes.delete(node);
    } else {
      this.expandedNodes.add(node);
    }
  }

  isExpanded(node: MenuNode): boolean {
    return this.expandedNodes.has(node);
  }

  onToggleSidenav(): void {
    this.sidenav.toggle();
  }
}
