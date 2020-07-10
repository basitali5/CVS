import { Component , OnInit} from '@angular/core';
import { AppService } from './app.service';
import { CVS } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  initialCvsData:CVS[] = [];
  cvsData:CVS[] = [];
  offset: number = 0;
  limit:number = 3;
  isSelectedleft: boolean;
  isAccountAsc: boolean;
  isChangeAsc: boolean;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService
      .getData()
        .subscribe((data) => {
          this.cvsData = data;
          this.initialCvsData = this.cvsData.slice(this.offset, this.limit);
        }, (err) => {
          console.log(err.message);
        });
  }

  sortData(col: string) : CVS[] {
    if(col === 'accountNumber'){
      this.isChangeAsc = undefined;

      if(this.isAccountAsc === undefined || !this.isAccountAsc)
        this.isAccountAsc = true;
      else
        this.isAccountAsc = false;

      this.initialCvsData.sort((a:CVS, b: CVS) => {
          let comparison =  (a.accountNumber < b.accountNumber) ? -1 : 
                              (a.accountNumber > b.accountNumber) ? 1: 0;
          
          return (this.isAccountAsc) ?  comparison : comparison * -1;
      });
    } else {
      this.isAccountAsc = undefined;

      if(this.isChangeAsc === undefined || !this.isChangeAsc)
        this.isChangeAsc = true;
      else
        this.isChangeAsc = false;

      this.initialCvsData.sort((a:CVS, b: CVS) => {
          let comparison =  (a.availableCash < b.availableCash) ? -1 : 
                              (a.availableCash > b.availableCash) ? 1: 0;
          
          return (this.isChangeAsc) ?  comparison : comparison * -1;
      });
    }
    return this.initialCvsData;
  }

  loadAll(): void {
    this.initialCvsData = this.cvsData;
    this.isAccountAsc = this.isChangeAsc = undefined;
  }

  currencyFormatter(number): string {
    return '$' + this.formatNumber(number);
  }
  
  private formatNumber(number): string {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
}
