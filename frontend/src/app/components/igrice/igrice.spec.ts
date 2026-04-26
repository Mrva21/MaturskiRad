import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Igrice } from './igrice';

describe('Igrice', () => {
  let component: Igrice;
  let fixture: ComponentFixture<Igrice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Igrice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Igrice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
