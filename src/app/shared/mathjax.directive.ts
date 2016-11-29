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

// SOURCE: http://ruinshe.moe/2016/05/31/support-mathjax-in-angular2/
/*
export class MathJaxDirective {
  @Input('MathJax') fractionString: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    console.log('>> ngOnChanges');
    this.el.nativeElement.style.backgroundColor = 'yellow';
    this.el.nativeElement.innerHTML = this.fractionString;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, this.el.nativeElement]);
  }
}

  */
