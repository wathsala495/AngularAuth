import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  type:string = "password";
  isText:boolean = false;
  eyeIcon:string="fa-eye-slash";
  font:string="font-weight-bold";
  pass:string ="password";
  signUpForm!: FormGroup;

  constructor(private fb:FormBuilder,private auth:AuthService){}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      
    });
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText?this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText?this.type="text":this.type="password"
     
  }
  onSignUp(){
    if(this.signUpForm.valid){
      //send the obj to database
      console.log(this.signUpForm.value)
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.signUpForm.reset();
        })
        ,error:(err=>{
          alert(err?.error.message)
        })
      })
    }
    else{
      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Your form is invalid")
    }
  }

  
}
