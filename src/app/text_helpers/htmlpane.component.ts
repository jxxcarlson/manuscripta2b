import { Component, Input } from '@angular/core';
import { Document } from '../shared/document.model';

@Component({
  selector: 'html-pane',
  template: '<div class="rendered-document" [innerHTML]=document.rendered_text></div>',
  styleUrls: ['./asciidoctor.css', '../vendor/coderay.css', '../vendor/extras.css', './anypane.component.css']
})
export class HtmlPane {
  @Input() document:Document;

}
/**


 styles: [`.rendered-document {
    font-size: 1.25rem;
    height: calc(100% - 0px);
    overflow: scroll;
}`]

 **/
