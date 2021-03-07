import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Dog } from './dog';
// import { DOGS } from './mock_dogs';

import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DogService {

  private dogsUrl = 'api/dogs';

  httpOptions = {
    headers: new HttpHeaders({ 'Context-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getDogs(): Observable<Dog[]> {
    this.messageService.add('DogService: fetched dogs');
    return this.http.get<Dog[]>(this.dogsUrl)
      .pipe(
        tap(_ => this.log('fetched dogs')),
        catchError(this.handleError<Dog[]>('getDogs, []'))
      );
  }

  getDog(id: number): Observable<Dog> {
    const url = `${this.dogsUrl}/${id}`;
    return this.http.get<Dog>(url).pipe(
      tap(_ => this.log(`fetched dog id=${id}`)),
      catchError(this.handleError<Dog>(`getDog id=${id}`))
    );
  }

  updateDog(dog: Dog): Observable<any> {
    return this.http.put(this.dogsUrl, dog, this.httpOptions).pipe(
      tap(_ => this.log(`updated dog id=${dog.id}`)),
      catchError(this.handleError<any>('updateDog'))
    );
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  // tslint:disable-next-line:typedef
  private log(message: string){
    this.messageService.add(`DogService: ${message}`);
  }

  addDog(dog: Dog): Observable<Dog> {
    return this.http.post<Dog>(this.dogsUrl, dog, this.httpOptions).pipe(
      tap((newDog: Dog) => this.log(`added dog w/ id=${newDog.id}`)),
      catchError(this.handleError<Dog>('addDog'))
    );
  }

  deleteDog(dog: Dog | number): Observable<Dog> {
    const id = typeof dog === 'number' ? dog : dog.id;
    const url = `${this.dogsUrl}/${id}`;
    return this.http.delete<Dog>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted dog id=${id}`)),
      catchError(this.handleError<Dog>('deletedDog'))
    );
  }

  searchDogs(term: string): Observable<Dog[]> {
    if (!term.trim()){
      return of([]);
    }
    return this.http.get<Dog[]>(`${this.dogsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
      this.log(`found dogs matching "${term}"`) :
      this.log(`no dogs matching "${term}"`)),
      catchError(this.handleError<Dog[]>('searchDogs', []))
    );
  }
}
