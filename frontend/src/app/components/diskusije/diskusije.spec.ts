import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diskusije } from './diskusije';

describe('Diskusije', () => {
  let component: Diskusije;
  let fixture: ComponentFixture<Diskusije>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diskusije]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diskusije);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
