import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {LogsService} from "../../app/services/logs.service";
import {LogDetailPage} from "../logDetails/logDetail";
import {Log} from "../../app/models/Log";

@Component({
    selector: 'page-logs',
    templateUrl: 'log.html',
    providers: [LogsService]
})
export class LogPage implements OnInit {

    logs: Log[];

    constructor(public navCtrl: NavController, private logService: LogsService) {

    }

    ngOnInit() {
        this.logService.getLogs().subscribe(logs => {
            this.logs = logs;
        });
    }

    addLog() {
        let d = new Date();
        let log = new Log();
        log.datetime = d.toISOString();

        this.navCtrl.push(LogDetailPage, {log: log, state:1});
    }

    imageSanitized(did:boolean): string {
        return did ? './assets/img/clean-hands.jpg' : './assets/img/hand-bacteria.jpg';
    }

    logSelected(event, log:Log)
    {
        this.navCtrl.push(LogDetailPage, {log: log, state:2});
    }
}
