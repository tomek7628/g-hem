import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ExerciseService } from 'app/entities/exercise/exercise.service';
import { IExercise, Exercise } from 'app/shared/model/exercise.model';
import { BodyPart } from 'app/shared/model/enumerations/body-part.model';

describe('Service Tests', () => {
  describe('Exercise Service', () => {
    let injector: TestBed;
    let service: ExerciseService;
    let httpMock: HttpTestingController;
    let elemDefault: IExercise;
    let expectedResult: IExercise | IExercise[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ExerciseService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Exercise(0, BodyPart.CHEST, 'AAAAAAA', 0, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            modified: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Exercise', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            modified: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            modified: currentDate
          },
          returnedFromService
        );

        service.create(new Exercise()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Exercise', () => {
        const returnedFromService = Object.assign(
          {
            bodyPart: 'BBBBBB',
            name: 'BBBBBB',
            series: 1,
            weight: 1,
            modified: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            modified: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Exercise', () => {
        const returnedFromService = Object.assign(
          {
            bodyPart: 'BBBBBB',
            name: 'BBBBBB',
            series: 1,
            weight: 1,
            modified: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
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

      it('should delete a Exercise', () => {
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
