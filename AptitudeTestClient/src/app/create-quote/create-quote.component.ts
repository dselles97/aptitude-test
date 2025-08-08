import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {QuotesDataClient} from '../quotes-data-client';
import {Quote} from '../models/quote';
import { State } from '../models/state';
import { CommonModule } from '@angular/common';
import {JsonPipe} from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-quote',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    CommonModule
  ],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.css'
})
export class CreateQuoteComponent {
  // This will give you access to the Quotes controller endpoints
  private readonly quotesDataClient = inject(QuotesDataClient);
  public states: State[] = [];
  public successful:string = '' 
  public isLoading = false;
  public isSuccess= false
  // What can you do with a list of states with the form?
  // this.quotesDataClient.getAllStates().subscribe(s => console.log(s));

  // Here is a sample of a form you can use
  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    tiv: new FormControl<string>('', [Validators.required, Validators.pattern(/^\d+$/) ]),
    stateId: new FormControl<string>('', Validators.required)
  });

  constructor(private router: Router){
    this.quotesDataClient.getAllStates().subscribe((s:State[]) =>{
      this.states = s;
    })
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
  submit(): void {
    this.quotesDataClient.createQuote(this.form.value as unknown as Quote)
      .subscribe((retVal : void | Quote | {quote: Quote, success: boolean}) => {
        // Implement any logic you see fit here.
       if (retVal && 'success' in retVal && retVal.success) {
          this.successful="Quote Created"
          this.loadingScreen()
          this.redirectAfterSuccess()
        }
      });
  }
}
