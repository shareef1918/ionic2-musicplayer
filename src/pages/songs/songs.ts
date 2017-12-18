import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { Toast } from '@ionic-native/toast';
import * as _ from 'underscore';

/**
 * Generated class for the SongsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html',
  providers: [File, Media, Toast]
})
export class SongsPage implements OnInit{
  public songsList: any;
  public currentSong:any;
  public mediaTimer: any;
  public selctedSong: MediaObject;
  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, public media:Media, private toast: Toast) {
    // this.musicProvider.getSongsList().then((result) => {
    //   this.songsList = result;
    // })
    this.currentSong = {
      name: 'Current Song',
      details: 'Singer Name',
      image: "https://yt3.ggpht.com/pHwZj3tkgC3SJFbuqebBoT7WtVcIwAijEmcbe9VDCauv9ZlG6uS2zjvZQUSO7SfFqa3xjYqGp_L4QbM7=s900-nd-c-c0xffffffff-rj-k-no",
      songNum: 1,
      isRunning: false,
      duration: 0
    }
    
  }
  checkFileAvailable() {
    return new Promise( (resolve, reject) =>{
      this.file.listDir(this.file.externalRootDirectory, 'Music').then((files) => {
        let list = [];
        files.forEach( (file) =>{
          let song = file;
          song['isRunnung'] = false;
          list.push(song);
        })
        resolve(list)
      }).catch((error) => { console.error(error) });
    })
  }
  ionViewDidLoad() {
    this.checkFileAvailable().then( (result) => {
      this.songsList = result;
      this.currentSong = this.songsList[0];
      this.selctedSong = this.media.create(this.currentSong.fullPath);
      this.selctedSong.onStatusUpdate.subscribe( (status) => {
        this.toast.show('Status changed '+ status, '5000', 'center').subscribe();
      })
      this.currentSong.duration = this.selctedSong.getDuration();
    }); 
  }
  ngOnInit(){
    
  }
  playCurrentSong(){
    this.currentSong.isRunning = true;
    this.selctedSong.play();
  }
  playSelectedSong(song:any){
    this.selctedSong.stop();
    this.currentSong.isRunning = false;
    this.selctedSong = this.media.create(song.fullPath);
    this.showProgress();
    this.currentSong.duration = this.selctedSong.getDuration();
    this.selctedSong.play(); 
    this.currentSong = song;
    this.currentSong.isRunning = true;
  }
  pauseSong(){
    this.currentSong.isRunning = false;
    this.selctedSong.pause();
  }
  playNextSong(){
    var index = _.indexOf(this.songsList, this.currentSong);
    this.currentSong.isRunning = false;
    if(index<this.songsList.length-1){
      this.currentSong = this.songsList[index+1]
    }else if(index == this.songsList.length-1){
      this.currentSong = this.songsList[0];
    }
    this.currentSong.isRunning = true;
    this.selctedSong.stop();
    this.selctedSong = this.media.create(this.currentSong.fullPath);
    this.selctedSong.play();
  }
  playPrevSong(){
    var index = _.indexOf(this.songsList, this.currentSong);
    this.currentSong.isRunning = false;
    if(index>0){
      this.currentSong = this.songsList[index-1]
    }else if(index == 0){
      this.currentSong = this.songsList[this.songsList.length-1];
    }
    this.currentSong.isRunning = true;
    this.selctedSong.stop();
    this.selctedSong = this.media.create(this.currentSong.fullPath);
    this.selctedSong.play();
  }
  public showProgress() {
		this.mediaTimer = setInterval(function () {
		    this.selctedSong.getCurrentPosition().then((curpos) => {
          this.mediaTimer = curpos;
          this.toast.show("Position: "+curpos, '1000', 'center').subscribe();
          if ( curpos < this.selctedSong.getDuration() ) {
            this.showProgress();
          }
        });
		}, 1000);
    }
}
