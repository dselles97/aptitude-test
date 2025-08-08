import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quote} from './models/quote';
import {State} from './models/state';

@Injectable({
  providedIn: 'root'
})
export class QuotesDataClient {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://localhost:7190/api/quotes';

  getAllQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.url);
  }

  getQuoteById(id: string): Observable<Quote> {
    const url = `${this.url}/${id}`;
    return this.http.get<Quote>(url);
  }

  createQuote(quote: Quote): Observable<Quote | void> {
    const formData = new FormData();
    formData.append('name', quote.name);
    formData.append('stateId', quote.stateId.toString());
    formData.append('tiv', quote.tiv.toString());
    return this.http.post<Quote | void>(this.url, formData)
  }

  updateQuote(id: string, quote: Quote): Observable<Quote | void> {
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${id}`;
    return this.http.put<Quote | void>(url, quote)
  }

  getAllStates(): Observable<State[]> {
    return this.http.get<State[]>(`${this.url}/states`);
  }
}
