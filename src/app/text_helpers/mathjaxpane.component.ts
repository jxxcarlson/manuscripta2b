import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Document } from '../shared/document.model';

@Component({
  selector: 'mathjax-pane',
  template: `
  <script type="text/x-mathjax-config">
        MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
    </script>
<div class="rendered-document"  [mathJax]=document.rendered_text>{{document.rendered_text}}</div>`,
  // styleUrls: ['./asciidoctor.css', './coderay.css', './extras.css', './anypane.component.css'],
  styleUrls: ['./anypane.component.css'],
  encapsulation: ViewEncapsulation.None // .Native, .Emulated
})
export class MathJaxPane {
  @Input() document:Document;

}


//  styleUrls: ['./asciidoctor.css', './coderay.css', './extras.css', './anypane.component.css']
