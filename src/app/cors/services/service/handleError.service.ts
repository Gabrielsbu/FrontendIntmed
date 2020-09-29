import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor() {}

  public HandleError(error) {
    console.log(error);

    if (error.error.non_field_errors) {
      Swal.fire(error.error.non_field_errors[0], '', 'warning');
    }

    // if (error.non_field_errors[0]) {
    //   Swal.fire(error.error.non_field_errors[0], '', 'warning');
    // }
  }
}
