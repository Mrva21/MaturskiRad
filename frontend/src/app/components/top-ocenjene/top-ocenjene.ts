import { ChangeDetectorRef, Component } from '@angular/core';
import { Rawg } from '../../services/rawg';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-top-ocenjene',
  imports: [RouterLink],
  templateUrl: './top-ocenjene.html',
  styleUrl: './top-ocenjene.css',
})
export class TopOcenjene {
  constructor(private servis: Rawg, private cd: ChangeDetectorRef) {}

  selectedPeriod = 30;
  games: any[] = [];

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.servis.getTopRatedGames(this.selectedPeriod)
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
