import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Document } from '../shared/document.model';

@Component({
  selector: 'mathjax-pane',
  template: `
<div class="rendered-document"  [mathJax]=document.rendered_text>{{document.rendered_text}}</div>`,
  styleUrls: ['./asciidoctor.css', './coderay.css', './extras.css', './anypane.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MathJaxPane {
  @Input() document:Document;

}


//  styleUrls: ['./asciidoctor.css', './coderay.css', './extras.css', './anypane.component.css']
