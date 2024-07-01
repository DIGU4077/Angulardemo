import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userEmail: string | null = null;
  private languageChangeSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.languageChangeSubscription = this.languageService.getLanguageChangeObservable().subscribe(language => {
      this.translate.use(language); // Update translation service language
    });

    this.userEmail = localStorage.getItem('email');
  }

  ngOnDestroy(): void {
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();
    }
  }

  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loginTimestamp');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
