import {Directive, ElementRef, OnChanges, Input} from "@angular/core";
declare var MathJax: {
  Hub: {
    Queue: (param: Object[]) => void;
  }
}
@Directive({selector: '[mathJax]'})
export class MathJaxDirective implements OnChanges {
  @Input("mathJax") private texString: string = "";
  constructor(private element: ElementRef) {}
  ngOnChanges() {
    this.element.nativeElement.innerHTML = this.texString;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.element.nativeElement]);
  }
}

