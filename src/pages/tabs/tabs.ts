import { Component } from '@angular/core';

import { PlaylistPage } from '../playlist/playlist';
import { AlbumsPage } from '../albums/albums';
import { SongsPage } from '../songs/songs';
import { ArtistsPage } from '../artists/artists';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  playlist = PlaylistPage;
  albums = AlbumsPage;
  songs = SongsPage;
  artists = ArtistsPage
  constructor() {

  }
}
