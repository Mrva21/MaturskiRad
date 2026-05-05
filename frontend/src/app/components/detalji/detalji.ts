import { ChangeDetectorRef, Component } from '@angular/core';
import { Rawg } from '../../services/rawg';
import { ActivatedRoute } from '@angular/router';
import { Korisnici } from '../../services/korisnici';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { retry } from 'rxjs';

@Component({
  selector: 'app-detalji',
  imports: [DatePipe, FormsModule],
  templateUrl: './detalji.html',
  styleUrl: './detalji.css',
})
export class Detalji {
  constructor(private servis: Rawg, private servis2: Korisnici, private ruta: ActivatedRoute, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.gameId = this.ruta.snapshot.paramMap.get('id')!;
    this.loadUser();
    this.loadGame();
    this.loadComments();
  }

  gameId: string = "";
  user: any = null;
  game: any = null;
  comments: Array<any> = [];
  text: string = "";
  isDisabled: Boolean = false;

  setToCache(key: string, value: any, ttlMinutes = 60) {
    const item = {
      value,
      expiry: Date.now() + ttlMinutes * 60 * 1000
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  getFromCache(key: string) {
    const data = localStorage.getItem(key);
    if (!data) return null;

    const item = JSON.parse(data);

    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }

  loadUser() {
    this.servis2.getUserViaEmail(localStorage.getItem('email') || '').subscribe(data => {
      this.user = data;
      this.cd.detectChanges();
    });
  }

  loadGame() {
    const cacheKey = `game-${this.gameId}`;
    const cachedGame = this.getFromCache(cacheKey);

    if (cachedGame) {
      this.game = cachedGame;
      return;
    }

    this.servis.getGameDetails(this.gameId).subscribe(data => {
      this.game = data;
      this.cd.detectChanges();
      this.setToCache(cacheKey, data);
    });
  }

  loadComments() {
    this.servis2.getComments(this.gameId).subscribe(data => {
      this.comments = data;
      this.cd.detectChanges();
    });
  }

  favourited(favourites: string[]): boolean {
    return favourites.includes(this.gameId);
  }

  favouriteGame(id: string, user: any) {
    const changeFavourites = user.favourites;
    changeFavourites.push(this.gameId);
    const change: any = {
      favourites: changeFavourites
    };
    this.isDisabled = true;
    setTimeout(() => {
      this.isDisabled = false;
      this.cd.detectChanges();
    }, 1500);
    this.servis2.updateUser(id, change).subscribe(data => {
      this.loadUser();
    });
  }

  unfavouriteGame(id: string, user: any) {
    let changeFavourites = user.favourites;
    changeFavourites = changeFavourites.filter((u: any) => u !== this.gameId);
    console.log(changeFavourites);
    const change: any = {
      favourites: changeFavourites
    };
    this.isDisabled = true;
    setTimeout(() => {
      this.isDisabled = false;
      this.cd.detectChanges();
    }, 1500);
    this.servis2.updateUser(id, change).subscribe(data => {
      this.loadUser();
    });
  }
  
  addComment() {
    const newComment = {
      game_id: this.gameId,
      date: new Date(),
      text: this.text,
      likes: 0,
      liked_by: [],
      user_id: this.user._id,
      user: {
        email: this.user.email,
        username: this.user.username
      }
    };
    this.servis2.postComment(newComment).subscribe(data => {
      alert("Comment Posted");
      this.loadComments();
    });
  }

  deleteComment(id: string) {
    this.servis2.deleteComment(id).subscribe(data => {
      alert("Comment Deleted");
      this.loadComments();
    });
  }

  liked(liked_by: string[], user: any): boolean {
    return liked_by.includes(this.user.email);
  }

  likeComment(id: string, comment: any) {
    const changeLikedBy = comment.liked_by;
    changeLikedBy.push(this.user.email);
    const change: any = {
      likes: Number(comment.likes) + 1,
      liked_by: changeLikedBy
    };
    this.isDisabled = true;
    setTimeout(() => {
      this.isDisabled = false;
      this.cd.detectChanges();
    }, 1500);
    this.servis2.updateComment(id, change).subscribe(data => {
      this.loadComments();
    });
  }

  unlikeComment(id: string, comment: any) {
    let changeLikedBy = comment.liked_by;
    changeLikedBy = changeLikedBy.filter((u: any) => u !== this.user.email);
    const change: any = {
      likes: Number(comment.likes) - 1,
      liked_by: changeLikedBy
    };
    this.isDisabled = true;
    setTimeout(() => {
      this.isDisabled = false;
      this.cd.detectChanges();
    }, 1500);
    this.servis2.updateComment(id, change).subscribe(data => {
      this.loadComments();
    });
  }

  loggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
} 