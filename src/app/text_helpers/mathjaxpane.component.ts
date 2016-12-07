import { Component, Input } from '@angular/core';
import { Document } from '../shared/document.model';

@Component({
  selector: 'mathjax-pane',
  template: '<div class="rendered-document"  [mathJax]=document.rendered_text>{{document.rendered_text}}</div>',

  styleUrls: ['./anypane.component.css', '../vendor/foundation-potion.css' , '../vendor/extras.css', '../vendor/coderay.css']
})
export class MathJaxPane {
  @Input() document:Document;

}

