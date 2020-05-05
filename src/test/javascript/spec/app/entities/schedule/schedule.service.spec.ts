import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ScheduleService } from 'app/entities/schedule/schedule.service';
import { ISchedule, Schedule } from 'app/shared/model/schedule.model';

describe('Service Tests', () => {
  describe('Schedule Service', () => {
    let injector: TestBed;
    let service: ScheduleService;
    let httpMock: HttpTestingController;
    let elemDefault: ISchedule;
    let expectedResult: ISchedule | ISchedule[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ScheduleService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Schedule(0, 'AAAAAAA', 0, currentDate, currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            created: currentDate.format(DATE_FORMAT),
            modified: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Schedule', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            created: currentDate.format(DATE_FORMAT),
            modified: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            created: currentDate,
            modified: currentDate
          },
          returnedFromService
        );

        service.create(new Schedule()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Schedule', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            dayOfWeek: 1,
            created: currentDate.format(DATE_FORMAT),
            modified: currentDate.format(DATE_FORMAT),
            archival: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            created: currentDate,
            modified: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Schedule', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            dayOfWeek: 1,
            created: currentDate.format(DATE_FORMAT),
            modified: currentDate.format(DATE_FORMAT),
            archival: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            created: currentDate,
            modified: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Schedule', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
