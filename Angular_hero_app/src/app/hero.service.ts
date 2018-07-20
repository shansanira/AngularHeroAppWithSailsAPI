import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HeroSearchComponent } from './hero-search/hero-search.component';
// import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl = 'http://localhost:1337';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /* fetch heroes from api */
  getHeroes(): Observable<Hero[]> {
    const url = this.heroesUrl + '/loadheroes';

    return this.http.get<Hero[]>(url).pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('get Heroes', []))
    );

  }

  /* fetch a particular hero from api */
  getHero(hero_no: number): Observable<Hero> {
    const url = `${this.heroesUrl + '/details'}/${hero_no}`;

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${hero_no}`)),
      catchError(this.handleError<Hero>(`getHero id=${hero_no}`))
    );
  }

  /* update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    const url = this.heroesUrl + '/update/' + hero.hero_no;

    return this.http.put(url, hero, httpOptions).pipe(
      tap(_ => this.log(`update hero id=${hero.hero_no}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /* add hero on the server */
  addHero(hero: Hero) {
    return this.http.post(this.heroesUrl + '/create', hero, httpOptions).pipe(
      tap(_ => this.log(`add hero w/ id=${hero.hero_no}`)),
      catchError(this.handleError<any>('addHero'))
    );
  }

  /* delete hero on the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.hero_no;
    const url = `${this.heroesUrl + '/delete'}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`delete hero id=${id}`)),
      catchError(this.handleError<any>('deleteHero'))
    );
  }

  /* search provide hero's fetched from database to hero-searchCompnent */
  searchHeroes(): Observable<Hero[]> {
    const url = `${this.heroesUrl + '/loadheroes'}`;
    return this.http.get<Hero[]>(url);
  }

  /* functions for log messages and handle errors. */
  private log(message: String) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /* search Heros by the given search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     return of([]);
  //   }

  //   const url = `${this.heroesUrl + '/loadheroes'}/?name=${term}`;

  //   return this.http.get<Hero>(url).pipe(
  //     tap(_ => this.log(`found heroes matching "${term}"`)),
  //     catchError(this.handleError<any>('searchHeroes'))
  //   );
  // }
}
