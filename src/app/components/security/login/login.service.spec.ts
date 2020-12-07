import { TestBed } from "@angular/core/testing"
import { LoginService } from "./login.service"

import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";

describe('Login Service', ()=>{

    let service: LoginService;
    let httpMock: HttpTestingController;

    beforeEach(()=>{
       TestBed.configureTestingModule({
        providers: [
            {provide:LoginService, useClass: LoginServiceStub}
        ],
        imports: [
          HttpClientTestingModule, FormsModule
        ],
       })

       service = TestBed.get(LoginService);
       httpMock = TestBed.get(HttpTestingController);
    })

    it('should create component', ()=>{
      
    })

})

class LoginServiceStub{

}