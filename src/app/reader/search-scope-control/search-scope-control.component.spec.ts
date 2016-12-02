/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchScopeControlComponent } from './search-scope-control.component';

describe('SearchScopeControlComponent', () => {
  let component: SearchScopeControlComponent;
  let fixture: ComponentFixture<SearchScopeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchScopeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchScopeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
