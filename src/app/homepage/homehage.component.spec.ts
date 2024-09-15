import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomehageComponent } from './homehage.component';

describe('HomehageComponent', () => {
  let component: HomehageComponent;
  let fixture: ComponentFixture<HomehageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomehageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomehageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
