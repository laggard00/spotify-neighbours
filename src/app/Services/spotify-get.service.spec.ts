import { TestBed } from '@angular/core/testing';

import { SpotifyGetService } from './spotify-get.service';

describe('SpotifyGetService', () => {
  let service: SpotifyGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
