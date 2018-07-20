import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
  ) { }

  search(): void {
    this.heroService.searchHeroes().subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.search();
  }
}

/**
 *  previous codes
*/

// private searchTerm = new Subject<string>();

// search(term: string): void {
  //   this.searchTerm.next(term);
  // }

// ngOnInit() {
  //   this.heroes$ = this.searchTerm.pipe(

  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((term: string) => this.heroService.searchHeroes(term)),

  //   );
  // }
