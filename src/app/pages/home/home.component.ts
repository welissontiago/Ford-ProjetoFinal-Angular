import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { VideoComponent } from '../../components/home/video/video.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, VideoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
