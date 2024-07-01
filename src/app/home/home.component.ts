import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  
  
  constructor(
   
    private languageService: LanguageService,
    private translate: TranslateService
  ) { }
  
  ngOnDestroy(): void {
    
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();
    }

  }

  formData: any = { name: '', email: '' };
  formDataList: any[] = [];
  isFormSubmitted = false;
  originalData: any = { name: '', email: '' };
  private languageChangeSubscription: Subscription | undefined;

  ngOnInit() {
    
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();
    }
    
    const savedData = localStorage.getItem('formDataList');
    if (savedData) {
      this.formDataList = JSON.parse(savedData);
    }
    
  }

  onSubmit() {
    this.formDataList.push({ ...this.formData });
    localStorage.setItem('formDataList', JSON.stringify(this.formDataList));
    this.isFormSubmitted = true;
    this.formData = { name: '', email: '' };
  }

  onDelete(entry: any) {
    const index = this.formDataList.indexOf(entry);
    if (index > -1) {
      this.formDataList.splice(index, 1);
      localStorage.setItem('formDataList', JSON.stringify(this.formDataList));
    }
  }

  onEdit(entry: any) {
    this.isFormSubmitted = false;
    this.formData = { ...entry };
    this.originalData = { ...entry };
  }
  onReset() {
    const index = this.formDataList.findIndex(item => item.name === this.originalData.name && item.email === this.originalData.email);
    
    if (index !== -1) {
      this.formDataList[index] = { ...this.formData };
      
      localStorage.setItem('formDataList', JSON.stringify(this.formDataList));
    }
  
    this.isFormSubmitted = true;
  }
  
}
