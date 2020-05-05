import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GhemSharedModule } from 'app/shared/shared.module';
import { PositionComponent } from './position.component';
import { PositionDetailComponent } from './position-detail.component';
import { PositionUpdateComponent } from './position-update.component';
import { PositionDeleteDialogComponent } from './position-delete-dialog.component';
import { positionRoute } from './position.route';

@NgModule({
  imports: [GhemSharedModule, RouterModule.forChild(positionRoute)],
  declarations: [PositionComponent, PositionDetailComponent, PositionUpdateComponent, PositionDeleteDialogComponent],
  entryComponents: [PositionDeleteDialogComponent]
})
export class GhemPositionModule {}
