import { Component, Input } from '@angular/core';
import { Document } from '../shared/document.model';

@Component({
  selector: 'textarea-pane',
  template: `<textarea class="rendered-document">{{document.text}}</textarea>`,
  styles: [`.rendered-document {
    font-size: 1.25rem;
    height: calc(100% - 0px);
    width:300px;
    overflow: scroll;
    white-space: pre-line;
}`]
})
export class TextAreaPane {
  @Input() document:Document;
}
