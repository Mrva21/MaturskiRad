import { ChangeDetectorRef, Component } from '@angular/core';
import { Rawg } from '../../services/rawg';
import { Korisnici } from '../../services/korisnici';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-diskusije',
  imports: [RouterLink],
  templateUrl: './diskusije.html',
  styleUrl: './diskusije.css',
})
export class Diskusije {
  constructor(private servis: Korisnici, private servis2: Rawg, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadGamesAndFavourites();
  }

  games: Array<any> = [];
  favourites: Array<any> = [];
  
  loadGamesAndFavourites() {
    const email = localStorage.getItem('email');
    if (email) {
      this.servis.getUserViaEmail(email).subscribe(user => {
        for (let i = 0; i < user.favourites.length; i++) {
          this.servis2.getGameDetails(user.favourites[i]).subscribe(data => {
              this.favourites.push(data);
              this.cd.detectChanges();
            });
        }
        this.servis.getAllComments(user._id).subscribe(comments => {
          for (let i = 0; i < comments.length; i++) {
            this.servis2.getGameDetails(comments[i].game_id).subscribe(data => {
              this.games.push(data);
              this.cd.detectChanges();
            });
          }
        });
      });
    }
  }

  loggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}
