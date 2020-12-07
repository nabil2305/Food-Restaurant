import { LoginService } from './../security/login/login.service';
// import { LoginService } from './../components/security/login/login.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'lacc-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public loginService:LoginService) { }

  ngOnInit() {
    //return true;
  }
  changepassword(data:any){
    //console.log(data);
    if(data.valid){
     let body={
        currentPassword:data.value.oldpassword,
        newPassword:data.value.newpassword
      }
      this.loginService.changepassword(body).subscribe(res=>{
        console.log(res)
        // do something

      },error=>{
        console.error(error)
        //do something
      })
    }
  }

}
