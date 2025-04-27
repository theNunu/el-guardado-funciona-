import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChampionComponent } from './add-champion.component';

describe('AddChampionComponent', () => {
  let component: AddChampionComponent;
  let fixture: ComponentFixture<AddChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChampionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
