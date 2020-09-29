import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from './../../cors/services/model/user.model';
import { HandleErrorService } from './../../cors/services/service/handleError.service';
import { AuthenticationService } from './../../cors/services/service/authentication.service';
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
        localStorage.setItem('token', data.key);
        Swal.fire(
          'Você efetuou o Login!',
          'Seja bem vindo ao Medicar',
          'success'
        );
        this.router.navigate(['/consults']);
      },
      (error) => {
        console.log(error);
        if (error.status === 400) {
          Swal.fire(
            'Verifique as credenciais inseridas e preencha todos os campos!',
            'Verifique os campos novamente!',
            'error'
          );

          if (error.error.password[0]) {
            Swal.fire(
              error.error.password[0],
              'Verifique os campos novamente!',
              'error'
            );
          }
        }
      }
    );
    this.formLogin.reset();
  }
}
