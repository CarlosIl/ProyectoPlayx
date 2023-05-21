import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFinalComponent } from './post-final.component';

describe('PostFinalComponent', () => {
  let component: PostFinalComponent;
  let fixture: ComponentFixture<PostFinalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostFinalComponent]
    });
    fixture = TestBed.createComponent(PostFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
