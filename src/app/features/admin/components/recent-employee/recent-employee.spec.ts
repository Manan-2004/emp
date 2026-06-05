import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentEmployee } from './recent-employee';

describe('RecentEmployee', () => {
  let component: RecentEmployee;
  let fixture: ComponentFixture<RecentEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentEmployee],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentEmployee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
