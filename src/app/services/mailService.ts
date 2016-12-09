import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";

import {AppState} from '../interfaces/appstate.interface'
import {User} from '../interfaces/user.interface'

@Injectable()
export class MailService {


  constructor(private store: Store<AppState>) {

    this.user$ = store.select(s => s.user);

    console.log(`CONSTRUCT: USER_SERVICE with token ??`)

  }

  send(emailId,subject,message) {

    window.open(`mailto: ${emailId}?subject=${subject}&body=${message}_self`)

  }

  shareDocument(document)
  {
    let subject = document.title  // 'Manuscripta.io document'
    let message = `You might be interested in%0D%0A%0D%0A        ${document.title}  %0D%0A%0D%0A at http://www.manuscripta.io/documents/${document.id}
      %0D%0A%0D%0Ahttp://www.manuscripta.io is a site for creating and sharing documents online.
       %0D%0AMathematics, Physics, Poetry, you name it.`
    this.send('', subject, message)

  }
}

}



