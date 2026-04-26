import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detalji } from './detalji';

describe('Detalji', () => {
  let component: Detalji;
  let fixture: ComponentFixture<Detalji>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detalji]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Detalji);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
