import { ChangeDetectorRef, Component } from '@angular/core';
import { Rawg } from '../../services/rawg';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-trending',
  imports: [RouterLink],
  templateUrl: './trending.html',
  styleUrl: './trending.css',
})
export class Trending {
  constructor(private servis: Rawg, private cd: ChangeDetectorRef) {}

  selectedPeriod = 30;
  games: any[] = [];

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.servis.getTrendingGames(this.selectedPeriod)
      .subscribe((data: any) => {
        this.games = data.results;
        this.cd.detectChanges();
      });
  }

  changePeriod(days: number) {
    this.selectedPeriod = days;
    this.loadGames();
  }
}
