import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customUpperCase',
    standalone: true,
    pure: true
})
export class customUpperCasePipe implements PipeTransform {
    transform(text: string | undefined): string | undefined {
        return text?.toUpperCase();
    }
}
