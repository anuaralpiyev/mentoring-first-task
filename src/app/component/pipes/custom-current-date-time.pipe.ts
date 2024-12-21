import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'customCurrentDateTime',
    standalone: true,
    pure: true
})
export class CustomCurrentDateTimePipe implements PipeTransform {
    transform(format: string = 'medium'): string {
        const currentDate = new Date();
        return new Intl.DateTimeFormat('ru-RU', this.getFormatOptions(format)).format(currentDate);
    }

    private getFormatOptions(format: string): Intl.DateTimeFormatOptions {
        switch (format) {
            case 'short':
                return {dateStyle: 'short', timeStyle: 'short'};
            case 'long':
                return {dateStyle: 'long', timeStyle: 'long'};
            default:
                return {dateStyle: 'medium', timeStyle: 'medium'};
        }
    }
}
