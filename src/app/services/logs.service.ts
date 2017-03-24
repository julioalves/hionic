/**
 * Created by Julio on 22-Mar-17.
 */
import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/Rx';
import {Log} from "../models/Log";


@Injectable()
export class LogsService{

    apiKey:string = "RmdNiFvPYoCQCc_IwlUZ3Q-llAH0Nz6e";
    logsUrl: string;
    positionsUrl: string;

    constructor(private http: Http) {
        this.http = http;
        this.logsUrl = "https://api.mlab.com/api/1/databases/higi/collections/logs";
        this.positionsUrl = "https://api.mlab.com/api/1/databases/higi/collections/positions";
    }

    getLogs()
    {
        return this.http.get(this.logsUrl + '?apiKey=' + this.apiKey + '&s={"datetime":-1}&l=30')
            .map(res=>res.json());
    }

    addLog(log:Log )
    {
        let headers = new Headers();
        headers.append('Content-type','application/json');
        if (log._id == null)
        {
            return this.http.post(this.logsUrl + '?apiKey=' + this.apiKey, JSON.stringify(log),{headers: headers } )
                .map(res=>res.json());

        } else {
            return this.http.put(this.logsUrl + '/'+ log._id.$oid + '?apiKey=' + this.apiKey ,JSON.stringify(log),{headers: headers } )
                .map(res=>res.json());
        }

    }


    getPositions()
    {
        return this.http.get(this.positionsUrl + '?apiKey=' + this.apiKey)
            .map(res=>res.json());
    }
}