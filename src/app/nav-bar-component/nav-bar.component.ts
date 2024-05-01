import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import {
  MatDialog,
} from '@angular/material/dialog';

import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'nav-bar-component',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  topicForm !: FormGroup;

  topicList: any[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder, public dialog: MatDialog) { }



  ngOnInit(): void {

    this.topicForm = this.fb.group({
      topic: new FormControl('')
    });


    for (let i = 0; i < localStorage.length; i++) {
      this.topicList = [...this.topicList, localStorage.key(i)]
    }

  }

  addTopic(): any {
    if (this.topicForm.value.topic.length > 1) {

      if (!localStorage.getItem(this.topicForm.value.topic)) {

        localStorage.setItem(this.topicForm.value.topic, 'null');

        this.topicList.push(this.topicForm.value.topic);

      }
    }
  }

  //all the logic for component of dialog
  shouldDelete !: boolean;

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, kalam: string, index: number): void {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { headline: "Do you want to delete this topic?" },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    const dialogData$ = dialogRef.afterClosed().pipe((tap((data) => { return data })));

    console.log(dialogData$);

    dialogRef.afterClosed().subscribe((data) => {
      this.shouldDelete = data;

      if (this.shouldDelete) {

        localStorage.removeItem(kalam);

        this.topicList.splice(index, 1);

        this.shouldDelete = false;
      }
    });

  }

}
