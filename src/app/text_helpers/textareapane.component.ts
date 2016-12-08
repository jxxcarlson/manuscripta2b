import { Component, Input } from '@angular/core';
import { Document } from '../shared/document.model';

@Component({
  selector: 'textarea-pane',
  template: `<button (click)="report(textarea.value)">Update Log</button>
    <textarea class="rendered-document">{{source_text}}</textarea>`,
  styles: [`.rendered-document {
    font-size: 1.25rem;
    height: calc(100% - 0px);
    width:100%;
    overflow: scroll;
    white-space: pre-line;
}`]
})
export class TextAreaPane {
  @Input() source_text:string;

  report(str: string) {

    console.log(`TEXTAREA VALUE: ${str}`)
  }
}
