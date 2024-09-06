import { NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// const time = new Date().getTime();

// console.log('time:', time)

// if (time === 69696969) {
//   console.log('time is correct')
// } else {
//   console.log('ERROR')
// }

// const func1 = (value: number) => console.log('number is: ', value);

// func1(69);

const menuItems = [
  'Каталог',
  'Стройматериалы',
  'Инструменты',
  'Электрика',
  'Интерьер и одежда',
];

const upperCaseMenuItems = menuItems.map((item) => {
  return item.toUpperCase();
});

// names.forEach((name) => {
//   console.log(name)
//   }
// )

// console.log(names[0], names[2]);

const funcMain = (text: string) => text;
const textMain = 'Главная';

const funcAboutCompany = (text: string) => text;
const textAboutCompany = 'О компании';

const fancCatalog = (text: string) => text;
const textCatalog = 'Каталог';

const newPagesArrays = [5, 4, 3, 2, 1];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf],
  templateUrl: './app.component.html', // Путь до шаблона
  styleUrl: './app.component.scss', // Путь до стилей
  // ./ - означает ищу в это папке такой-то файл

  // app.component.ts - имеет такие свойства как templateUrl: и styleUrl:
})
export class AppComponent {
  // Экспортируем класс
  title: string = 'mentoring-first-project';

  isShowCatalogOne = true; // Все что начинается на 'is' это boolean
  isRectangleImage = true;
  isAboutCompany = true;

  isUpperCase = true;

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map((item) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    );
    return this.isUpperCase = !this.isUpperCase;
  }

  readonly main = funcMain(textMain);
  readonly aboutCompany = funcAboutCompany(textAboutCompany);
  readonly textCatalog = fancCatalog(textCatalog);

  readonly header2Item1 = upperCaseMenuItems[0];
  readonly header2Item2 = 'Стройматериалы';
  readonly header2Item3 = 'Инструменты';
  readonly header2Item4 = 'Электрика';
  readonly header2Item5 = 'Интерьер и одежда';

  menuItems = upperCaseMenuItems;
  newPages = newPagesArrays;

  // В Angular переменные(поле класса) пишем сразу в классах и компонентах.
  // Теперь и в классах и в компонетах переменные пишем без 'let' и 'const'

  // readonly - (только для чтения), это ключевое слово, используемое в TypeScript для обозначения того,
  // что свойство объекта или переменной не может быть изменено после его инициализации.
}
