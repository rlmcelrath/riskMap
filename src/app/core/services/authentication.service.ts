import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {

    constructor(private http: Http) { }
 
    login(email: string, password: string) {
    }
 
    logout() {
    }
}