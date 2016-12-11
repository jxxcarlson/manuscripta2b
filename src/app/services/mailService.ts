import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";

import {AppState} from '../state-management/interfaces/appstate.interface'
import {User} from '../state-management/interfaces/user.interface'
import {WindowRef} from '../services/windowRef'

@Injectable()
export class MailService {


  constructor(private winRef: WindowRef) {

  }

  send(emailId,subject,message) {


    this.winRef.nativeWindow.open(`mailto: ${emailId}?subject=${subject}&body=${message} target="_self"`)

  }

  shareDocument(document)
  {
    this.send('test', 'foo@bar.io', 'Yodel louder!')

  }

  shareDocument1(document)
  {
    let subject = document.title
    let message = `You might be interested in%0D%0A%0D%0A  ${document.title}  %0D%0A%0D%0A at http://www.manuscripta.io/documents/${document.id}
      %0D%0A%0D%0Ahttp://www.manuscripta.io is a site for creating and sharing documents online.
       %0D%0AMathematics, Physics, Poetry, you name it.`
    this.send('', subject, message)

  }

}



