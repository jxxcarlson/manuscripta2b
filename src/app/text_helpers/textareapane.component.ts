import { Component, Input } from '@angular/core';
import { Document } from '../shared/document.model';

@Component({
  selector: 'textarea-pane',
  template: `<button (click)="report(textarea.value)">Update Log</button>
    <textarea class="rendered-document" type="text" class="form-control" id="text_input"
             [(ngModel)]="model.text_input" text_input="text_input"
      ></textarea>`,
  styles: [`.rendered-document {
    font-size: 1.25rem;
    height: calc(100% - 0px);
    width:100%;
    overflow: scroll;
    white-space: pre-line;
}`]
})

export class TextAreaPane {

  model = {text_input: ''}

  constructor() {

  }
  // onSubmit() { this.submitted = true; console.log(model.text) }

}
