import {Component, inject, OnInit} from '@angular/core';
import {QuotesDataClient} from '../quotes-data-client';
import {Quote} from '../models/quote';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, switchMap} from 'rxjs';
import {CommonModule, JsonPipe} from '@angular/common';
import { State } from '../models/state';

@Component({
  selector: 'app-edit-quote',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    CommonModule
  ],
  templateUrl: './edit-quote.component.html',
  styleUrl: './edit-quote.component.css'
})
export class EditQuoteComponent implements OnInit {
  private readonly quotesDataClient = inject(QuotesDataClient);
  private readonly route = inject(ActivatedRoute);
  private quoteId$ = inject(ActivatedRoute).paramMap.pipe(
    map(params => params.get('id'))
  );

  quoteId: string | null = null;
  public states: State[] = [];
  public successful: string = '';
  public isLoading = false;
  public isSuccess= false
  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    tiv: new FormControl<string>('', [Validators.required,  Validators.pattern(/^\d+$/)]),
    stateId: new FormControl<string>('', Validators.required)
  });
  constructor(private router: Router){
    this.quotesDataClient.getAllStates().subscribe(s => {
      this.states = s
    });
  }
  ngOnInit() {
    // This is getting the id from the URL, calling the API to retrieve the quote
    // and then updating the form with the quotes values.
    this.quoteId$.pipe(
      filter(id => id !== null),
      switchMap(id => {
        this.quoteId = id
        return this.quotesDataClient.getQuoteById(id)
      })
    ).subscribe(quote => {
      this.form.patchValue({
        name: quote.name,
        tiv: quote.tiv.toString(),
        stateId: quote.stateId.toString()
      });
    });

    this.quotesDataClient.getAllStates().subscribe(s => console.log(s));
  }
    redirectAfterSuccess() {
    setTimeout(() => {
      this.router.navigate(['/quotes']);
    }, 5000); // 3000ms = 3 seconds
  }
  /**
   * This will call the /quotes POST endpoint
   */
  loadingScreen(){
    this.isLoading = true;
  // simulate async operation like HTTP request
    setTimeout(() => {
      this.isLoading = false;
      this.isSuccess = true;
      }, 2000);
  }
  /**
   * This will call the /quotes/{id} PUT endpoint
   * What changes do you need to make here for it to work?
   */

  submit(): void {
    this.quotesDataClient.updateQuote(this.quoteId as string, this.form.value as unknown as Quote)
      .subscribe((retVal : void | Quote | {quote: Quote, success: boolean}) => {
        if(retVal && 'success' in retVal && retVal.success){
          this.successful = "Quote edited successfully";
          this.loadingScreen();
          this.redirectAfterSuccess()
        }
      });
  }
}
