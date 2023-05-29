import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMobileComponent } from './sidenav-mobile.component';

describe('SidenavMobileComponent', () => {
  let component: SidenavMobileComponent;
  let fixture: ComponentFixture<SidenavMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavMobileComponent]
    });
    fixture = TestBed.createComponent(SidenavMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
