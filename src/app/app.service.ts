import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CVS } from './app.model';

@Injectable({
    providedIn: 'root',
})
export class AppService {

    constructor(private httpClient: HttpClient) { }

    getData() {
        return this.httpClient.get<CVS[]>("assets/data.json");
    }
}