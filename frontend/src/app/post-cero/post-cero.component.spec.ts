import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCeroComponent } from './post-cero.component';

describe('PostCeroComponent', () => {
  let component: PostCeroComponent;
  let fixture: ComponentFixture<PostCeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCeroComponent]
    });
    fixture = TestBed.createComponent(PostCeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
