import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.GhemScheduleModule)
      },
      {
        path: 'position',
        loadChildren: () => import('./position/position.module').then(m => m.GhemPositionModule)
      },
      {
        path: 'exercise',
        loadChildren: () => import('./exercise/exercise.module').then(m => m.GhemExerciseModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GhemEntityModule {}
