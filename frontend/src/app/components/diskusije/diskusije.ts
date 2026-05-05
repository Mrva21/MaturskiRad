import { ChangeDetectorRef, Component } from '@angular/core';
import { Rawg } from '../../services/rawg';
import { Korisnici } from '../../services/korisnici';

@Component({
  selector: 'app-diskusije',
  imports: [],
  templateUrl: './diskusije.html',
  styleUrl: './diskusije.css',
})
export class Diskusije {
  constructor(private servis: Korisnici, private servis2: Rawg, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.servis.getAllComments("69dd1c5411a2bf1e84820e8b").subscribe(data => {
      console.log(data);
    });
  }

  games: Array<any> = [];
}
