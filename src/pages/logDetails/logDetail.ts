import {Component, OnInit} from '@angular/core';

import {NavController, NavParams, ToastController} from 'ionic-angular';
import {LogsService} from "../../app/services/logs.service";
import {Log} from "../../app/models/Log";
import {LogPage} from "../log/log";

@Component({
    selector: 'page-detail-logs',
    templateUrl: 'logDetails.html',
    providers: [LogsService]
})
export class LogDetailPage implements OnInit {

    log: Log;
    state: number;
    result: any;
    status_label: string;

    constructor(public navCtrl: NavController, private params: NavParams,
                private logService: LogsService, private toast: ToastController) {

    }

    ngOnInit() {
        this.log = this.params.get('log');
        this.state = this.params.get('state');
        this.status_label = (this.state == 1 ? 'Nova coleta' : 'Editando uma coleta');
    }

    updateLog() {
        // if (this.state == 1) {
            this.logService.addLog(this.log).subscribe(data => {
                this.result = data;
                let toast = this.toast.create({
                    message: 'Log atualizado com sucesso',
                    duration: 3000
                });
                toast.present();
            });
        // }
        // else {
        //
        // }
        this.navCtrl.popTo(LogPage);
    }

}
