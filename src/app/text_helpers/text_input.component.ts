import { Component, Input } from '@angular/core';

@Component({
  selector: 'text-input',
  templateUrl: './text_input.component.html',
  styles: [`.rendered-document {
    font-size: 1.25rem;
    height: calc(100% - 0px);
    overflow: scroll;
    white-space: pre-line;
}`]
})

export class TextInput {
  model = {text_input: ''}
  submitted = false;
  onSubmit() { this.submitted = true; console.log(model.text)}
}
