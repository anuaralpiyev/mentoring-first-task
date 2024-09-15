import { NgFor, NgIf } from '@angular/common';
import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './loyaut/header.component';
import { FooterComponent } from './loyaut/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // title: string = 'mentoring-first-project';

  // В Angular переменные(поле класса) пишем сразу в классах и компонентах.
  // Теперь и в классах и в компонетах переменные пишем без 'let' и 'const'

  // readonly - (только для чтения), это ключевое слово, используемое в TypeScript для обозначения того,
  // что свойство объекта или переменной не может быть изменено после его инициализации.
}
