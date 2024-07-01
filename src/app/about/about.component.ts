import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
formdata:any={name:""}
formdatalist:any[]=[];
submit()
{
  this.formdatalist.push({...this.formdata});
  localStorage.setItem('formdatalist', JSON.stringify(this.formdatalist));

}
}
