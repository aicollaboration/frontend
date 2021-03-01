import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Backendless from 'backendless';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

Backendless.initApp('064CA377-4274-75AF-FF60-4EB6BFF10000', 'BC4605C3-7B43-498D-B446-1D104AD4BDB8');

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
