import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingsSiteComponent } from './followings-site.component';

describe('FollowingsSiteComponent', () => {
  let component: FollowingsSiteComponent;
  let fixture: ComponentFixture<FollowingsSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowingsSiteComponent]
    });
    fixture = TestBed.createComponent(FollowingsSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
