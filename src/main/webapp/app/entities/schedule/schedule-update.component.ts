import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISchedule, Schedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'jhi-schedule-update',
  templateUrl: './schedule-update.component.html'
})
export class ScheduleUpdateComponent implements OnInit {
  isSaving = false;
  createdDp: any;
  modifiedDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(50)]],
    dayOfWeek: [],
    created: [],
    modified: [],
    archival: []
  });

  constructor(protected scheduleService: ScheduleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ schedule }) => {
      this.updateForm(schedule);
    });
  }

  updateForm(schedule: ISchedule): void {
    this.editForm.patchValue({
      id: schedule.id,
      name: schedule.name,
      dayOfWeek: schedule.dayOfWeek,
      created: schedule.created,
      modified: schedule.modified,
      archival: schedule.archival
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const schedule = this.createFromForm();
    if (schedule.id !== undefined) {
      this.subscribeToSaveResponse(this.scheduleService.update(schedule));
    } else {
      this.subscribeToSaveResponse(this.scheduleService.create(schedule));
    }
  }

  private createFromForm(): ISchedule {
    return {
      ...new Schedule(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      dayOfWeek: this.editForm.get(['dayOfWeek'])!.value,
      created: this.editForm.get(['created'])!.value,
      modified: this.editForm.get(['modified'])!.value,
      archival: this.editForm.get(['archival'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchedule>>): void {
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
}
