import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {File} from "@ionic-native/file";
import {LogsService} from "../../app/services/logs.service";
import {Log} from "../../app/models/Log";

@Component({
    selector: 'page-export',
    templateUrl: 'export.html',
    providers: [File]
})
export class ExportPage implements OnInit{
    dataObjectArray: Log[];
    dataColumnNames: string[] = [
        "id", "data", "local","profissional", "momento", "higienizou", "insumo"
    ];

    constructor(public navCtrl: NavController, private logApi: LogsService) {

    }

    ngOnInit(): void {
    }

}
