import { ChangeDetectorRef, Component } from '@angular/core';
import { Rawg } from '../../services/rawg';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  imports: [RouterLink],
  templateUrl: './pocetna.html',
  styleUrl: './pocetna.css',
})
export class Pocetna {
  constructor(private service: Rawg, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.service.getTrendingGames().subscribe(rez => {
      this.trendingGames = rez.results.slice(0,3);
      this.cd.detectChanges();
    });
    this.service.getTopRatedGames().subscribe(rez => {
      this.topRatedGames = rez.results.slice(0, 3);
      this.cd.detectChanges();
    });
  }

  trendingGames: Array<any> = [];
  topRatedGames: Array<any> = [];
}
