import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  //implement quick sort algorithm here
  constructor() { }

  sortCount(nameCountDate : any[]) : void {
    nameCountDate.sort((a: any[] , b: any[]) => a[1] - b[1]);
    console.log(nameCountDate);
  }

  sortDate(nameCountDate : any[]) : void {
    nameCountDate.sort((a: any[] , b: any[]) => {
      let dateA = new Date(a[2]);
      let dateB = new Date(b[2]);
      return ((dateA > dateB) ? -1 : 1);
    });
    console.log(nameCountDate);
  }


}
