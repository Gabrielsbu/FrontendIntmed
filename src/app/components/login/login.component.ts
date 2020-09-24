import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from './../../services/model/user.model';
import { ServiceService } from './../../services/service/service.service';
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
    private rest: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
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
          'Ops, verifique os campos novamente!',
          'You clicked the button!',
          'warning'
        );
      }
    );
    this.formLogin.reset();
  }
}
