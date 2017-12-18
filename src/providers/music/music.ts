import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MusicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MusicProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MusicProvider Provider');
  }
  getSongsList() {
    return new Promise( (resolve, reject) => {
      let list = [];
      for(let i = 0;i <= 40; i++){
        list.push({test: i});
      }
      resolve(list);
    })
    
  }
}
