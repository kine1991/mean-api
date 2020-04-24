import { AuthService } from 'src/app/auth/service/auth.service';
import { FormControl, AsyncValidator } from '@angular/forms';
import { map, delay, catchError, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniqueEmail implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: FormControl): Observable<any> | Promise<any> => {
    return control.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(value => {
        return this.authService.getEmail(value);
      }),
      map(data => {
        return null;
      }),
      catchError(error => {
        if (error.error.email !== null) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );

    // const y = this.authService.getEmail(control.value).pipe(
    //   map(data => {
    //     // console.log('data2', data);
    //     return null;
    //   }),
    //   catchError(error => {
    //     console.log('error', error);
    //     if (error.error.email === null) {
    //       return of({ nonUniqueUsername: true });
    //     } else {
    //       return of({ noConnection: true });
    //     }
    //   })
    // );
  }
}
