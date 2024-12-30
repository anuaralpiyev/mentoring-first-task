import { Pipe, PipeTransform } from '@angular/core';

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
        const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
            short: { dateStyle: 'short', timeStyle: 'short' },
            long: { dateStyle: 'long', timeStyle: 'long' },
        };

        return formatOptions[format] || { dateStyle: 'medium', timeStyle: 'medium' };
    }
}
