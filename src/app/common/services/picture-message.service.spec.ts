import { TestBed } from '@angular/core/testing';

import { PictureMessageService } from './picture-message.service';

describe('PictureMessageService', () => {
  let service: PictureMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
