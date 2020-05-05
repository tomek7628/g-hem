import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPosition, Position } from 'app/shared/model/position.model';
import { PositionService } from './position.service';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule/schedule.service';
import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from 'app/entities/exercise/exercise.service';

type SelectableEntity = ISchedule | IExercise;

@Component({
  selector: 'jhi-position-update',
  templateUrl: './position-update.component.html'
})
export class PositionUpdateComponent implements OnInit {
  isSaving = false;
  schedules: ISchedule[] = [];
  exercises: IExercise[] = [];

  editForm = this.fb.group({
    id: [],
    position: [null, [Validators.required]],
    scheduleId: [],
    exerciseId: []
  });

  constructor(
    protected positionService: PositionService,
    protected scheduleService: ScheduleService,
    protected exerciseService: ExerciseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ position }) => {
      this.updateForm(position);

      this.scheduleService.query().subscribe((res: HttpResponse<ISchedule[]>) => (this.schedules = res.body || []));

      this.exerciseService.query().subscribe((res: HttpResponse<IExercise[]>) => (this.exercises = res.body || []));
    });
  }

  updateForm(position: IPosition): void {
    this.editForm.patchValue({
      id: position.id,
      position: position.position,
      scheduleId: position.scheduleId,
      exerciseId: position.exerciseId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const position = this.createFromForm();
    if (position.id !== undefined) {
      this.subscribeToSaveResponse(this.positionService.update(position));
    } else {
      this.subscribeToSaveResponse(this.positionService.create(position));
    }
  }

  private createFromForm(): IPosition {
    return {
      ...new Position(),
      id: this.editForm.get(['id'])!.value,
      position: this.editForm.get(['position'])!.value,
      scheduleId: this.editForm.get(['scheduleId'])!.value,
      exerciseId: this.editForm.get(['exerciseId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPosition>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
