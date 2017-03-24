import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import {ExportPage} from '../export/export';
import {LogPage} from "../log/log";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = LogPage;
  tab2Root: any = AboutPage;
  tab3Root: any = ExportPage;

  constructor() {

  }
}
