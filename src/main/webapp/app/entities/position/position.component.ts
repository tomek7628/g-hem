import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPosition } from 'app/shared/model/position.model';
import { PositionService } from './position.service';
import { PositionDeleteDialogComponent } from './position-delete-dialog.component';

@Component({
  selector: 'jhi-position',
  templateUrl: './position.component.html'
})
export class PositionComponent implements OnInit, OnDestroy {
  positions?: IPosition[];
  eventSubscriber?: Subscription;

  constructor(protected positionService: PositionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.positionService.query().subscribe((res: HttpResponse<IPosition[]>) => (this.positions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPositions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPosition): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPositions(): void {
    this.eventSubscriber = this.eventManager.subscribe('positionListModification', () => this.loadAll());
  }

  delete(position: IPosition): void {
    const modalRef = this.modalService.open(PositionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.position = position;
  }
}
