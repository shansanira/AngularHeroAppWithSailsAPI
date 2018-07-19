import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import {Hero} from '../hero';
import { MessageService } from '../message.service';
// import {HEROES} from '../mock-heroes';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // heroes = HEROES;
  // selectedHero: Hero;
  heroes: Hero[];
  hero: Hero;

  constructor(
    private heroService: HeroService,
    public messageService: MessageService
  ) { }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(id: String, name: String): void {

    name = name.trim();
    id = id.trim();
    if (!name || !id) { return; }

    this.heroService.addHero({hero_no: +id, name: name}).subscribe(hero => {this.heroes.push(hero); });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  // }
  ngOnInit() {
    this.getHeroes();
  }

}
