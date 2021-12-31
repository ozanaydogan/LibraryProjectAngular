import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcategoriesComponent } from './bookcategories.component';

describe('BookcategoriesComponent', () => {
  let component: BookcategoriesComponent;
  let fixture: ComponentFixture<BookcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookcategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
