import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExerciseComponentsPage, ExerciseDeleteDialog, ExerciseUpdatePage } from './exercise.page-object';

const expect = chai.expect;

describe('Exercise e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let exerciseComponentsPage: ExerciseComponentsPage;
  let exerciseUpdatePage: ExerciseUpdatePage;
  let exerciseDeleteDialog: ExerciseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Exercises', async () => {
    await navBarPage.goToEntity('exercise');
    exerciseComponentsPage = new ExerciseComponentsPage();
    await browser.wait(ec.visibilityOf(exerciseComponentsPage.title), 5000);
    expect(await exerciseComponentsPage.getTitle()).to.eq('ghemApp.exercise.home.title');
    await browser.wait(ec.or(ec.visibilityOf(exerciseComponentsPage.entities), ec.visibilityOf(exerciseComponentsPage.noResult)), 1000);
  });

  it('should load create Exercise page', async () => {
    await exerciseComponentsPage.clickOnCreateButton();
    exerciseUpdatePage = new ExerciseUpdatePage();
    expect(await exerciseUpdatePage.getPageTitle()).to.eq('ghemApp.exercise.home.createOrEditLabel');
    await exerciseUpdatePage.cancel();
  });

  it('should create and save Exercises', async () => {
    const nbButtonsBeforeCreate = await exerciseComponentsPage.countDeleteButtons();

    await exerciseComponentsPage.clickOnCreateButton();

    await promise.all([
      exerciseUpdatePage.bodyPartSelectLastOption(),
      exerciseUpdatePage.setNameInput('name'),
      exerciseUpdatePage.setSeriesInput('5'),
      exerciseUpdatePage.setWeightInput('5'),
      exerciseUpdatePage.setModifiedInput('2000-12-31')
    ]);

    expect(await exerciseUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await exerciseUpdatePage.getSeriesInput()).to.eq('5', 'Expected series value to be equals to 5');
    expect(await exerciseUpdatePage.getWeightInput()).to.eq('5', 'Expected weight value to be equals to 5');
    expect(await exerciseUpdatePage.getModifiedInput()).to.eq('2000-12-31', 'Expected modified value to be equals to 2000-12-31');

    await exerciseUpdatePage.save();
    expect(await exerciseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await exerciseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Exercise', async () => {
    const nbButtonsBeforeDelete = await exerciseComponentsPage.countDeleteButtons();
    await exerciseComponentsPage.clickOnLastDeleteButton();

    exerciseDeleteDialog = new ExerciseDeleteDialog();
    expect(await exerciseDeleteDialog.getDialogTitle()).to.eq('ghemApp.exercise.delete.question');
    await exerciseDeleteDialog.clickOnConfirmButton();

    expect(await exerciseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
