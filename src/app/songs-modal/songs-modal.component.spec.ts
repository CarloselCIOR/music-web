import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsModalComponent } from './songs-modal.component';

describe('BooksModalComponent', () => {
  let component: SongsModalComponent;
  let fixture: ComponentFixture<SongsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
