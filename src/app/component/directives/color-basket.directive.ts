import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[colorBasket]',
    standalone: true
})
export class ColorBasketDirective {
    public colorOne: string = '';
    public colorTwo: string = '';
    public text: string = '';

    @HostBinding('style.backgroundColor')
    get backgroundColor() {
        return this.colorOne;
    };

    @HostBinding('style.color')
    get textColor() {
        return this.colorTwo;
    };

    @HostBinding('style.fontSize')
    get textSize() {
        return this.text
    };

    @HostListener('mouseenter')
    enter() {
        this.colorOne = '#ff3f81'
        this.colorTwo = '#4c565f'
        this.text = '14px'
    };

    @HostListener('mouseleave')
    leave() {
        this.colorOne = '#4c565f'
        this.colorTwo = 'white'
        this.text = '15px'
    };
}
