import { Component, Input } from '@angular/core';
import { Document } from './document.model';

@Component({
  selector: 'mathjax-pane',
  template: '<div class="rendered-document"  [mathJax]=document.rendered_text>{{document.rendered_text}}</div>',
  styles: [`.rendered-document {
    font-size: 1.25rem;
    height: calc(100% - 0px);
    overflow: scroll;
}`]
})
export class MathJaxPane {
  @Input() document:Document;

}

