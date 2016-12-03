import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.interface'
import { SigninService } from '../signin.service'

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public myForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];

  constructor(private _fb: FormBuilder, private signinService: SigninService) {

    this.signinService = signinService
  }

  ngOnInit() {

    this.myForm = this._fb.group({
      username: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
      password: ['', [<any>Validators.required, <any>Validators.minLength(5)]],

    });

    // subscribe to form changes
    this.subscribeToFormChanges();

    // Update single value
    (<FormControl>this.myForm.controls['username'])
      .setValue('John', { onlySelf: true });

  }

  subscribeToFormChanges() {
    const myFormStatusChanges$ = this.myForm.statusChanges;
    const myFormValueChanges$ = this.myForm.valueChanges;

    myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
    myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
  }

  save(model: User, isValid: boolean) {
    this.submitted = true;
    console.log('YAY!!')
    console.log(model, isValid);
    this.signinService.getToken(model.username, model.password)
      .subscribe( (x) => console.log(`Response: ${x}`))
  }

}

