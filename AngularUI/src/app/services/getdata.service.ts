import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserapiService } from './userapi.service';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  private id:any;
  public companies:any = [];
  public users:any = [];
  public val:number;
  public exists:boolean=false;

  constructor(private auth:AuthService,private api :UserapiService) {
    //this.id = this.getCompanyId();
    //this.exists = this.getFound();
   }

 
}
