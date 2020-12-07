import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../login/users.model';


import { LoginService } from './login.service';
import { NotificationService } from '../../shared/messages/notification.service';
import { PATTERS } from '../../shared/patterns';
import { Observable } from 'rxjs';
import { User } from './login.model';

@Component({
    selector: 'lacc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    data: Users[] = [
        {
            userEmail: "john@gmail.com",
            userPassword: "123456"
        },
        {
            userEmail: "sharathtanneer98@gmail.com",
            userPassword: "sharath15"
        }
    ]
    i: number = 0;

    navigateTo: string;
    isLoggedIn: boolean = true;
    isForgotPwd: boolean = false;
    isVerified: boolean = false;
    isPwdDone: boolean = false;
    isMisMatch: boolean = false;
    temp: number = 0;
    logInObs: Observable<{ success: boolean, token: string }>;
    PwdObs: Observable<{ success: boolean, token: string }>;
    formBuilder: any;

    constructor(private fb: FormBuilder,
        private loginServive: LoginService,
        private activateRouter: ActivatedRoute,
        private router: Router,
        private notificationService: NotificationService) {
    }

    ngOnInit() {

        this.navigateTo = this.activateRouter.snapshot.params['to'] || btoa('/');
    }

    verifyEmail(forgotForm: NgForm) {
        this.PwdObs = this.loginServive.forgotpassword(forgotForm.value.emailID);

        for (this.i = 0; this.i < this.data.length; this.i++) {
            if (forgotForm.value.emailID == this.data[this.i].userEmail) {
                this.temp = 1;
                break;
            }
            else {
                this.temp = 0;
            }
        }
        if (this.temp == 1) {

            this.isVerified = !this.isVerified;
            this.notificationService.notify(`Email-ID Verified`);
        }

        else {
            this.isForgotPwd = !this.isForgotPwd;
            this.notificationService.notify(`Email-ID Verification Failed. Try again!`);

        }
    }

    pwdDone(pwdForm: NgForm) {
        if (pwdForm.value.newPassword == pwdForm.value.confirmPassword) {
            this.data[this.i]
            this.notificationService.notify(`Password Changed Successfully for user : "${this.data[this.i].userEmail}"`);
            this.isForgotPwd = !this.isForgotPwd;
            this.isVerified = !this.isVerified;
        }
        else {
            this.isMisMatch = !this.isMisMatch;
        }
    }

    login(loginForm: NgForm) {

        if (this.isLoggedIn) {
            this.logInObs = this.loginServive
                .login(loginForm.value.email, loginForm.value.password);
            console.log(this.loginServive)
        }
        else
        {
            this.logInObs = this.loginServive
            .signUp(loginForm.value.fullName,loginForm.value.email, loginForm.value.password, loginForm.value.city, loginForm.value.country);
        }
        
        this.logInObs.subscribe(
            response => {
                if(response.success)
                {
                    this.loginServive.accessToken=response.token;
                    this.getUserData();
                }
                
            },       
            response1 => this.notificationService.notify(response1.error.message)  
        );
        
        loginForm.reset();
    }
    getUserData() {
        this.loginServive.getUserData().subscribe(
            user => {
                this.router.navigate([atob(this.navigateTo)]);
                this.notificationService.notify(`Welcome ${user.userName}`);
                this.loginServive.user = user;

            },
            response => this.notificationService.notify(response.error.message)
        )
    }

    switchMode() {
        this.isLoggedIn = !this.isLoggedIn;
    }
    forgotPwd() {
        this.isForgotPwd = !this.isForgotPwd;
    }



}
