import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-export',
  templateUrl: 'export.html'
})
export class ExportPage {

    dataObjectArray:Object[] = [
        {
            "id": 2,
            nome: "fulano"
        }
    ];
    dataColumnNames: string[] = [
        "id", "nome"
    ];

  constructor(public navCtrl: NavController) {

  }

}
