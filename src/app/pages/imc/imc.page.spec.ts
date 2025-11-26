import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImcPage } from './imc.page';

describe('ImcPage', () => {
  let component: ImcPage;
  let fixture: ComponentFixture<ImcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
