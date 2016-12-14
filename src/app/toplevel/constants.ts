import {Injectable} from '@angular/core';

@Injectable()
export class Constants{

  apiRoot: string
  host: string
  tickCycleSize: number

  document1: any
  document2: any

  constructor(){

    // this.apiRoot = 'http://localhost:2300/v1'
    // this.apiRoot = 'http://xdoc-api.herokuapp.com/v1'
    this.apiRoot = 'http://xdoc-api.io/v1'
    this.host = 'localhost:4200'
    this.tickCycleSize = 10

    this.document1 = {
      id: '23',
      title: 'Imagine!',
      text: 'foo',
      rendered_text: '<img src="http://psurl.s3.amazonaws.com/images/jc/1920px-Great_Wave_off_Kanagawa2-fe2b.jpg" width="600" style="float:left; margin-right:15px; ">'
    }

    this.document2 = {
      id: 2,
      title: 'Introductory Magick',
      text: 'It _is_ magical!',
      rendered_text: '<p>It <i>is</i> magical!</p>'
    }

  }
}
