import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'customRemoveDashes',
    standalone: true,
    pure: true
})
export class customRemoveDashesPipe implements PipeTransform {

    transform(value?: string): string {
        if (!value) return '';
        return value.replace(/[-+()\D]/g, ' ')
    }
}
