import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Korisnici } from './services/korisnici';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private servis: Korisnici) {}
  protected readonly title = signal('frontend');

  ngOnInit() {
    this.servis.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  users: Array<any> = [];
  email: string = "";
  username: string = "";
  password: string = "";

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
    const user = {
      email: this.email,
      username: this.username,
      password: this.password
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
}
