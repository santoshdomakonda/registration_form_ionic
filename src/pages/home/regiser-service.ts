import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RegistrationService {

    constructor(private http: HttpClient) {}

    register(user: any) {
        return this.http.post(`/register`, user);
    }
}