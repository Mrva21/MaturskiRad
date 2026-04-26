import { ChangeDetectorRef, Component } from '@angular/core';
import { Rawg } from '../../services/rawg';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-igrice',
  imports: [FormsModule, RouterLink],
  templateUrl: './igrice.html',
  styleUrl: './igrice.css',
})
export class Igrice {
  constructor(private servis: Rawg, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filters.search = value;
      this.loadGames();
    });

    this.loadGames();
  }

  games: any[] = [];
  private searchSubject = new Subject<string>();
  
  filters: any = {
    search: '',
    genre: '',
    platform: '',
    rating: ''
  }
  
  loadGames() {
    this.servis.getGamesViaFilter(this.filters).subscribe((res: any) => {
      this.games = res.results;
      this.cd.detectChanges();
    });
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
    this.cd.detectChanges();
  }
}
