import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-coding',
  templateUrl: './single-coding.component.html',
  styleUrls: ['./single-coding.component.css']
})
export class SingleCodingComponent implements OnInit {

  today  = new Date().toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"});
  selectedConcept: any;
  problems: any[] = [];

  binding:any = {
    title: 'Search clinical problem',
    type: 'autocomplete',
    ecl: `<< 404684003 |Clinical finding (finding)|`,
    value: '',
    note: 'Diagnosis.',
    hide: true,
    annotations: {
      "313307000" : `Use for:
      <ul>
        <li>Epileptic seizures of unknown onset or where the confidence of onset is < 80%</li>
      </ul>
      Do not use for:
      <ul>
        <li>Epileptic seizures where the clinician is ≥ 80% confident of a generalized onset</li>
        <li>Epileptic seizures where the clinician is ≥ 80% confident of a focal  onset</li>
      </ul>
      `,
      "246545002" : `Use for:
      <ul>
        <li>Epileptic seizures where the clinician is ≥ 80% confident of a generalized onset</li>
      </ul>
      Do not use for:
      <ul>
        <li>Epileptic seizures of focal onset, unknown onset or where the confidence of onset is < 80%</li>
      </ul>
      `
    }
  }

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(NotImplementedAlertComponent, {
      duration: 5 * 1000,
    });
  }

  setSelectedConcept(problem: any) {
    this.selectedConcept = problem;
  }

  addProblem(event: any) {
    this.problems.push(this.selectedConcept)
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: './not-implemented-alert.html',
  styles: [
    `
    .example-pizza-party {
      color: hotpink;
    }
  `,
  ],
})
export class NotImplementedAlertComponent {}
