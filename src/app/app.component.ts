import { Component, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('myInput1')
  myInputVariable1: ElementRef;

  @ViewChild('myInput2')
  myInputVariable2: ElementRef;

  title = 'app';
  messageText: Array<string> = ['',''];
  messageImage: Array<any> = ['',''];
  messages: Array<any>;
  users: Array<any> = [{id:1}, {id:2}];
  public selectedFile: FileList;
  public selectedFile2: FileList;

  constructor() {
  }

  ngOnInit() {
    this.messages = new Array();
  }

  sendMessage(i) {
  	if(this.messageText[i] || this.messageImage[i]) {
	    const message = {
		  sender: this.users[i].id,
	      text: this.messageText[i],
	      image: this.messageImage[i]
	    };
	    console.log(message);
	    this.messages.push(message);
	    this.messageText[i] = '';
	    this.messageImage[i] = '';
	    if(i == 0) this.myInputVariable1.nativeElement.value = "";
	    else this.myInputVariable2.nativeElement.value = "";
	}
  }

  addUser() {
  	this.users.push({id:this.users.length+1})
  	this.messageText.push('');
  }

  public getBase64(file, i) {
    var reader = new FileReader();
    var obj = this;
    reader.readAsDataURL(file);
    reader.onload = function () {
      obj.messageImage[i] = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  public selectFile(event,i) {
    this.selectedFile = event.target.files;
    var file  = event.target.files[0];
    var reader = new FileReader();
    if (file) {
      console.log(file);
      this.getBase64(file, i);
    }
  }
}
