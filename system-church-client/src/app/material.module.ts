import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatTableModule, MatAutocompleteModule, MatIconModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatListItem, MatList, MatListModule, MatExpansionModule, MatToolbarModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AngularWebStorageModule } from 'angular-web-storage';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
    imports: [
        MatExpansionModule,
        MatListModule,
        MatMenuModule,
        MatDialogModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatStepperModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatCardModule,
        AngularWebStorageModule,
        MatTooltipModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatIconModule,
        MatPaginatorModule,
        MatDividerModule,
        MatGridListModule,
        MatToolbarModule,
      ],
    exports: [
        MatExpansionModule,
        MatListModule,
        MatDialogModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatStepperModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatCardModule,
        MatTableModule,
        MatTooltipModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatIconModule,
        MatPaginatorModule,
        MatGridListModule,
        MatToolbarModule,
      ]
  })
  export class MaterialModule { }