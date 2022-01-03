import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TreoNavigationModule } from '@treo/components/navigation';
import { CreationModule } from 'app/layout/common/creation/creation.module';
import { HelpModule } from 'app/layout/common/help/help.module';
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';
import { SearchModule } from 'app/layout/common/search/search.module';
import { ShortcutsModule } from 'app/layout/common/shortcuts/shortcuts.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { ModernLayoutComponent } from 'app/layout/layouts/horizontal/modern/modern.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        ModernLayoutComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        TreoNavigationModule,
        MessagesModule,
        NotificationsModule,
        SearchModule,
        ShortcutsModule,
        UserModule,
        CreationModule,
        SharedModule,
        HelpModule,
    ],
    exports: [
        ModernLayoutComponent
    ]
})
export class ModernLayoutModule {
}
