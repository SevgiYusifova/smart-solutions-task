import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterInfo } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    user: this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }),
    organization: this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^(\\+?[0-9]{1,3}[ -]?|0)[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{2}[ -]?[0-9]{2}\\b')]],
      address: ['', Validators.required]
    })
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.authService.register(this.registerInfo);
    this.router.navigate(['/admin']);
  }

  get username(): FormControl {
    return (this.registerForm.get('user') as FormGroup).get('username') as FormControl;
  }
  get email(): FormControl {
    return (this.registerForm.get('user') as FormGroup).get('email') as FormControl;
  }
  get password(): FormControl {
    return (this.registerForm.get('user') as FormGroup).get('password') as FormControl;
  }
  get organizationName(): FormControl {
    return (this.registerForm.get('organization') as FormGroup).get('name') as FormControl;
  }
  get organizationPhone(): FormControl {
    return (this.registerForm.get('organization') as FormGroup).get('phone') as FormControl;
  }
  get organizationAddress(): FormControl {
    return (this.registerForm.get('organization') as FormGroup).get('address') as FormControl;
  }

  private get registerInfo(): RegisterInfo {
    const registerFormData = this.registerForm.value;

    return {
      email: registerFormData.user.email,
      username: registerFormData.user.username,
      password: registerFormData.user.password,
      organizationName: registerFormData.organization.name,
      organizationAddress: registerFormData.organization.address,
      organizationPhone: registerFormData.organization.phone
    }
  }
}
