import { AuthenticationService } from './../../cors/services/service/authentication.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private rest: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      email: '',
    });
  }

  createUser() {
    this.rest.criarUsuario(this.registerForm.value).subscribe(
      (data) => {
        Swal.fire(
          'Cadastro realizado com sucesso!',
          `Seja bem vindo a Medicar`,
          'success'
        );
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status === 400) {
          Swal.fire(
            'Verifique as credenciais inseridas e preencha todos os campos!',
            'Verifique os campos novamente!',
            'error'
          );

          if (error.error.username[0]) {
            Swal.fire(
              error.error.username[0],
              'Verifique os campos novamente!',
              'error'
            );
          }
        }
      }
    );
    this.registerForm.reset();
  }
}
