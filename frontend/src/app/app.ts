import { ChangeDetectorRef, Component, ElementRef, HostListener, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Korisnici } from './services/korisnici';
import { Rawg } from './services/rawg';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private servis: Korisnici, private servis2: Rawg, private cd: ChangeDetectorRef, private eRef: ElementRef) {}
  protected readonly title = signal('frontend');

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => this.servis2.getGamesViaSearch(query))
    ).subscribe((res: any) => {
      this.results = res.results;
      this.cd.detectChanges();
    });
    this.servis.getUsers().subscribe(data => {
      this.users = data;
      this.cd.detectChanges();
    });
  }

  users: Array<any> = [];
  email: string = "";
  username: string = "";
  password: string = "";
  searchSubject = new Subject<string>();
  results: Array<any> = [];
  isFocused: boolean = false;

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === "true";
  }

  login() {
    const user = this.users.find(u => u.username === this.username);
    if (!user) alert("User with that username doesn't exist!");
    if (user.password === this.password) {
      alert("Successful Login!");
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);
      window.location.reload();
    } else {
      alert("Wrong password!");
    }
  }

  register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/;

    if (!emailRegex.test(this.email)) {
      alert("Invalid Email!");
      return;
    }

    if (!usernameRegex.test(this.username)) {
      alert("Username needs to have between 3-16 (characters, numbers or dashes)!");
      return;
    }

    if (!passwordRegex.test(this.password)) {
      alert("Password needs to have at least 6 characters and 1 number!");
      return;
    }

    const user = {
      email: this.email,
      username: this.username,
      password: this.password,
      favourites: []
    };
    const existing = this.users.find(u => u.email === this.email);
    if (existing) alert("User with that e-mail already exists!");
    else {
      this.servis.postUser(user).subscribe(data => {
        alert(data.poruka);
        window.location.reload();
      });
    }
  }

  logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    window.location.reload();
  }

  onSearch(query: string) {
    if (!query || query.length < 2) {
      this.results = [];
      return;
    }
    this.searchSubject.next(query);
  }

  selected() {
    this.results = [];
    this.isFocused = false;
    setTimeout(() => {
      window.location.reload();
      this.cd.detectChanges();
    }, 200);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isFocused = false;
    }
  }
}
