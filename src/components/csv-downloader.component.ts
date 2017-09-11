import {Component, Input, Output, EventEmitter, Renderer} from '@angular/core';
import {File, FileWriter} from "@ionic-native/file";
import {Platform} from "ionic-angular";
import {LogsService} from "../app/services/logs.service";
@Component({
    selector: 'csv-downloader',
    template: `
        <button ion-button icon-left large (click)="build()">
            <ion-icon name='cloud-download'></ion-icon>
            {{downloaderName}}
        </button>
          `
})
export class CsvDownloader {
    @Input() downloaderName: string = 'Download CSV';
    @Input() headers: string[] = [];
    @Input() data: any[] = [];
    @Input() fileName: string = 'data.csv';
    @Output() onError = new EventEmitter<Error>();

    constructor(private renderer: Renderer, private file: File, public plt: Platform, private logApi:LogsService) {
    }

    build() {
        this.logApi.getLogs().subscribe(logs => {
            this.data = logs;
            if (!this.data.length) {
                this.onError.emit(new Error('Data not available.'));
                return;
            }
            let csvString = this.construct();
            this.buildDownloader(csvString);
        });

    }

    private getDocumentBody(): any {
        return document.body;
    }

    private construct(): string {
        let tabText = '';
        const keys = Object.keys(this.data[0]);
        if (!this.headers.length) {
            // if no headers are passed, use data keys for headers
            this.headers = keys;
        }

        this.headers.forEach(h => {
            tabText += '"' + h + '",';
        });

        if (tabText.length > 0) {
            tabText = tabText.slice(0, -1);
            tabText += '\r\n';
        }

        this.data.forEach(d => {
            keys.forEach(k => {
                let key = k;
                //if (key == "_id") key = "_id.$oid";
                if (d.hasOwnProperty(key) && d[key] != null) {
                    if (key == '_id') 
                    {
                        tabText += '"' + d[key]['$oid'] + '",';
                    }else {
                        tabText += '"' + d[key] + '",';
                    }
                } else {
                    tabText += '"",';
                }
            });

            tabText = tabText.slice(0, -1);
            tabText += '\r\n';
        });

        return tabText;
    }

    private buildDownloader(data) {

        if (this.plt.is('android'))
        {
            this.saveToFile(data);

        } else {
            let anchor = this.renderer.createElement(this.getDocumentBody(), 'a');
            this.renderer.setElementStyle(anchor, 'visibility', 'hidden');
            this.renderer.setElementAttribute(anchor, 'href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(data));
            this.renderer.setElementAttribute(anchor, 'target', '_blank');
            this.renderer.setElementAttribute(anchor, 'download', this.fileName);

            setTimeout(() => {
                this.renderer.invokeElementMethod(anchor, 'click');
                this.renderer.invokeElementMethod(anchor, 'remove');
            }, 5);
        }

    }

    private saveToFile(data)
    {
        this.file.createFile('.', this.fileName, true ).then( fe=> {
                fe.createWriter(function(fw){
                    fw.write(data);
                }),
                    function (err) {
                        console.log(err.toString());
                    }

            }

        );
    }
}