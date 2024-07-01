import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import{Router}from '@angular/router'
import { LanguageService } from '../language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  isloggedin:boolean=true;

  constructor(private router: Router,private  languageService: LanguageService,    private translate: TranslateService
  ) 
  {
    this.checkLoginValidity();
   
 
  }
  switchLanguage(language: string) {
    this.languageService.switchLanguage(language);
  }




  register()
  {
    this.isloggedin=false;

  }
  login()
  {
  this.isloggedin=true;
  }


  onRegister(data:any)
  {
      const name=data.value.email;
      const pass=data.value.password;
      localStorage.setItem('registoruser',JSON.stringify({email:name,password:pass}));
      data.value.email='';
      data.value.password='';
      data.reset();
      alert("registration done successfully");
      this.isloggedin=true;

  }
  
  onSubmit(data: any) {
    const name = data.value.email;
    const pass = data.value.password;
    const registoruser=JSON.parse(localStorage.getItem('registoruser')||'{}') ;
    if (name === registoruser.email && pass === registoruser.password) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('email',name);
      localStorage.setItem('loginTimestamp', Date.now().toString());
      console.log('Logged in status:', localStorage.getItem('loggedIn')); 
      this.router.navigate(['/home']);
    } else {
      alert("Invalid username and password");
    }
  }
  
  
  private checkLoginValidity()
  {

    const loggedIn=localStorage.getItem('loggedIn');
    const loginTimestamp=localStorage.getItem('loginTimestamp');
    if(loggedIn==='true'&&loginTimestamp)
      {
        const currentTime=Date.now();
        const timeDiff=currentTime-parseInt(loginTimestamp);
        const sevenDaysInMs=7*24*60*60*1000;
        if(timeDiff<sevenDaysInMs)
          {
            this.router.navigate(['/home'])
          }
          else
          {
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('loginTimestamp');
          }
      }
  }
  

  
}


