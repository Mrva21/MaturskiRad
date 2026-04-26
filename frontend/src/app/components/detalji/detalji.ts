import { ChangeDetectorRef, Component } from '@angular/core';
import { Rawg } from '../../services/rawg';
import { ActivatedRoute } from '@angular/router';
import { Korisnici } from '../../services/korisnici';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    this.loadGame();
    this.loadComments();
    this.email = localStorage.getItem('email')!;
    this.username = localStorage.getItem('username')!;
  }

  gameId: string = "";
  game: any = null;
  comments: Array<any> = [];
  email: string = "";
  username: string = "";
  text: string = "";

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
  
  addComment() {
    this.servis2.getUserViaEmail(this.email).subscribe(data => {
      const user = data;
      const newComment = {
        game_id: this.gameId,
        date: new Date(),
        user: user,
        text: this.text,
        likes: 0,
        liked_by: []
      };
      this.servis2.postComment(newComment).subscribe(data => {
        alert("Comment Posted");
        this.loadComments();
      });
    });
  }

  deleteComment(id: string) {
    this.servis2.deleteComment(id).subscribe(data => {
      alert("Comment Deleted");
      window.location.reload();
    });
  }

  likeComment(id: string, comment: any) {
    const changeLikedBy = comment.liked_by;
    changeLikedBy.push(this.email);
    const change: any = {
      likes: Number(comment.likes) + 1,
      liked_by: changeLikedBy
    };
    this.servis2.updateComment(id, change).subscribe(data => {
      this.loadComments();
    });
  }

  unlikeComment(id: string, comment: any) {
    let changeLikedBy = comment.liked_by;
    changeLikedBy = changeLikedBy.filter((u: any) => u !== this.email);
    const change: any = {
      likes: Number(comment.likes) - 1,
      liked_by: changeLikedBy
    };
    this.servis2.updateComment(id, change).subscribe(data => {
      this.loadComments();
    });
  }

  liked(liked_by: string[]): Boolean {
    return liked_by.includes(this.email);
  }

  loggedIn(): Boolean {
    if (localStorage.getItem('loggedIn')) return true;
    else return false;
  }
} 