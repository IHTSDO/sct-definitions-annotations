import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TerminologyService } from '../services/terminology.service';
import { UntypedFormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap,tap} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BindingDetailsComponent } from '../binding-details/binding-details.component';

@Component({
  selector: 'app-autocomplete-binding',
  templateUrl: './autocomplete-binding.component.html',
  styleUrls: ['./autocomplete-binding.component.css']
})
export class AutocompleteBindingComponent implements OnInit {
  formControl = new UntypedFormControl();
  autoFilter: Observable<any> | undefined;
  @Input() binding: any;
  @Output() selectionChange = new EventEmitter<any>();
  loading = false;
  selectedConcept: any = {};
  loadingDefinitions = false;
  hasLogo = false;
  logo = '';

  constructor(private terminologyService: TerminologyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.autoFilter = this.formControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>  {
        this.loading = true;
        let response = this.terminologyService.expandValueSet(this.binding.ecl, term);
        return response;
      }),
      tap(data => {
        this.loading = false;
      })
    );  
  }

  optionSelected(value: any) {
    this.selectedConcept = value;
    this.selectionChange.emit(value);
    this.loadingDefinitions = true;
    this.terminologyService.lookupConcept(value.code).subscribe(response => {
      response.parameter.forEach((o: any) => {
        if (o.name == "designation") {
          let isDef: boolean = false;
          o.part.forEach( (p: any) => {
            if (p.name == "use" && p.valueCoding.code == "900000000000550004") {
              isDef = true;
            }
          });
          if (isDef) {
            o.part.forEach( (p: any) => {
              if (p.name == "value") {
                this.selectedConcept.definition = p.valueString;
              }
            });
          }
        }
      });
      this.loadingDefinitions = false;
    });
    this.hasLogo = false;
    const ecl = `${value.code} AND ^ 784008009 |SNOMED CT to Orphanet simple map|`;
    this.terminologyService.expandValueSet(ecl, '').subscribe(response => {
      if (response?.expansion?.total > 0) {
        this.hasLogo = true;
        this.logo = 'orphanet.png';
      }
    });
    if (this.binding.annotations[value.code]) {
      this.hasLogo = true;
      this.logo = 'ilae-logo.png';
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BindingDetailsComponent, {
      height: '90%',
      width: '70%',
      data: this.binding
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

}