import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {ExportPage} from '../pages/export/export';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CsvDownloader} from "../components/csv-downloader.component";
import {LogPage} from "../pages/log/log";
import {LogsService} from "./services/logs.service";
import {LogDetailPage} from "../pages/logDetails/logDetail";

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ExportPage,
        LogPage,
        TabsPage,
        CsvDownloader,
        LogDetailPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ExportPage,
        LogPage,
        TabsPage,
        CsvDownloader,
        LogDetailPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        LogsService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
