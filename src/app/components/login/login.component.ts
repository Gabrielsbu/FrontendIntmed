import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from './../../services/model/user.model';
import { AuthenticationService } from './../../services/service/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  users: User[];
  public formLogin: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private rest: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  realizarLogin() {
    this.rest.logarUsuario(this.formLogin.value).subscribe(
      (data) => {
        Swal.fire(
          'Você efetuou o Login!',
          'Seja bem vindo ao Medicar',
          'success'
        );
        this.router.navigate(['/consults']);
      },
      (error) => {
        Swal.fire(
          'Ops, algo de errado não estar certo!',
          'Verifique os campos e tente novamente!',
          'error'
        );
      }
    );
    this.formLogin.reset();
  }
}
