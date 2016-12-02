import {Injectable} from 'angular2/core';

@Injectable()
export class Constants{

  apiRoot: string;

  constructor(){

    this.apiRoot = 'http://localhost:2300/v1'

  }
}
