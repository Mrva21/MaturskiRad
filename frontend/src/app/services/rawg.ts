import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Rawg {
  private apiKey: string = "4b68398829e24b4b9f7cc23ab8b0b06e";
  private baseUrl: string = "https://api.rawg.io/api";

  constructor(private http: HttpClient) {}

  getGames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/games?key=${this.apiKey}`);
  }

  getGamesViaFilter(filters: any): Observable<any> {
    let params = new HttpParams().set('key', this.apiKey);

    if (filters.genre) params = params.set('genres', filters.genre);
    if (filters.platform) params = params.set('platforms', filters.platform);
    if (filters.search) params = params.set('search', filters.search);

    if (filters.rating) {
      if (filters.rating === 'high') params = params.set('metacritic', '80,100');
      if (filters.rating === 'mid') params = params.set('metacritic', '50,79');
      if (filters.rating === 'low') params = params.set('metacritic', '0,49');
    }

    return this.http.get(`${this.baseUrl}/games`, { params });
  }

  getGameDetails(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/games/${id}?key=${this.apiKey}`);
  }

  getGameTrailer(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/games/${id}/movies?key=${this.apiKey}`);
  }

  getTrendingGames(): Observable<any> {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    return this.http.get(`${this.baseUrl}/games?key=${this.apiKey}&dates=${formatDate(lastMonth)},${formatDate(today)}&ordering=-added&page-size=1`);
  }

  getTopRatedGames(): Observable<any> {
    const today = new Date();
    const lastThreeMonths = new Date();
    lastThreeMonths.setMonth(today.getMonth() - 3);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    return this.http.get(`${this.baseUrl}/games?key=${this.apiKey}&dates=${formatDate(lastThreeMonths)},${formatDate(today)}&ordering=-rating&page-size=1`);
  }
}
