import { Component, inject } from '@angular/core';
import { Icon, icons } from '../shared/const';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  icons: Icon[] = icons;
}
