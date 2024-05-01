import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, Subscribable, Subscription, map, startWith, tap } from 'rxjs';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { SortingService } from '../services/sorting.service';

@Component({
  selector: 'app-madeh',
  templateUrl: './madeh.component.html',
  styleUrls: ['./madeh.component.scss']
})
export class MadehComponent {

  kalamName !: FormGroup;

  topicName$ !: Observable<string>;

  topicName !: string;

  list !: string[];

  filteredOptions !: Observable<string[]> | undefined;

  listNameCountDate !: any[];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private dialog: MatDialog,
    private sort: SortingService) {

    this.topicName$ = this.route.params.pipe(map((p) => {
      this.topicName = p['name'];
      this.listNameCountDate = JSON.parse(localStorage.getItem(this.topicName) || '');
      return p['name'];
    }));

    
  }

  ngOnInit(): void {

    this.kalamName = this.fb.group({
      kalam: new FormControl('')
    });

    this.filteredOptions = this.kalamName.get('kalam')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.topicName$.subscribe(data => {
      this.listNameCountDate = JSON.parse(localStorage.getItem(data) || '');
      for (let i = 0; i < this.listNameCountDate.length; i++) {
        if (this.list && this.list.length > 0) {
          this.list = [this.listNameCountDate[i][0], ...this.list]
        } else {
          this.list = [this.listNameCountDate[i][0]];
        }
      }

    });

    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;

    this.topicName = snapshot.params['name'];

    this.listNameCountDate = JSON.parse(localStorage.getItem(this.topicName) || '');
  }

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();

    this.list = [];

   this.topicName$.subscribe(data => {
    
      this.listNameCountDate = JSON.parse(localStorage.getItem(data) || '');
      for (let i = 0; i < this.listNameCountDate.length; i++) {
        if (this.list && this.list.length > 0) {
          this.list = [this.listNameCountDate[i][0], ...this.list]
        } else {
          this.list = [this.listNameCountDate[i][0]];
        }
      }
    });
   
    return this.list.filter(listOption => listOption.toLowerCase().includes(filterValue));
  }

  onClick(): any {

    this.listNameCountDate = JSON.parse(localStorage.getItem(this.topicName) || '');

    if (this.kalamName.value.kalam.length > 3) {
      let time = new Date();

      const kalamData = [this.kalamName.value.kalam, 0, time];

      if (this.listNameCountDate) {
        this.listNameCountDate = [kalamData, ...this.listNameCountDate];
      } else {
        this.listNameCountDate = [kalamData];
      }

      for (let i = 0; i < this.listNameCountDate.length; i++) {
        if (this.list && this.list.length > 0) {
          this.list = [this.listNameCountDate[i][0], ...this.list]
        } else {
          this.list = [this.listNameCountDate[0]];
        }
      }

      localStorage.setItem(this.topicName, JSON.stringify(this.listNameCountDate));
    }

    this.kalamName.reset({
      kalam: ''
    })
  }

  shouldDelete !: boolean;

  openDialogToRemove(enterAnimationDuration: string, exitAnimationDuration: string, index: number): void {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { headline: "Do you want to delete this kalam?" },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration
    });


    dialogRef.afterClosed().subscribe(data => {
      this.shouldDelete = data;
      if (this.shouldDelete) {
        console.log(`kalam will be deleted of index ${index}`);

        this.listNameCountDate.splice(index, 1);

        localStorage.setItem(this.topicName, JSON.stringify(this.listNameCountDate));

        for (let i = 0; i < this.listNameCountDate.length; i++) {
          if (this.list && this.list.length > 0) {
            this.list = [this.listNameCountDate[i][0], ...this.list]
          } else {
            this.list = [this.listNameCountDate[0]];
          }
        }

        this.shouldDelete = false;
      }
    })

  }

  shouldIncrease !: boolean;

  openDialogToAdd(enterAnimationDuration: string, exitAnimationDuration: string, index: number): void {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { headline: "Do you want to increase this kalam's count?" },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration
    });

    console.log(index);

    dialogRef.afterClosed().subscribe(data => {
      this.shouldIncrease = data;
      if (this.shouldIncrease) {
        this.listNameCountDate[index][1] = this.listNameCountDate[index][1] + 1;
        this.listNameCountDate[index][2] = new Date();

        localStorage.setItem(this.topicName, JSON.stringify(this.listNameCountDate));

        this.shouldIncrease = false;
      }
    })
  }

  sortCount() {
    this.sort.sortCount(this.listNameCountDate);
  }

  sortDate() {
    this.sort.sortDate(this.listNameCountDate);
  }

  ngOnDestroy() {

  }
}
