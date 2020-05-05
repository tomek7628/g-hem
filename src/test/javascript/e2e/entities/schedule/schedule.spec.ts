import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ScheduleComponentsPage, ScheduleDeleteDialog, ScheduleUpdatePage } from './schedule.page-object';

const expect = chai.expect;

describe('Schedule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let scheduleComponentsPage: ScheduleComponentsPage;
  let scheduleUpdatePage: ScheduleUpdatePage;
  let scheduleDeleteDialog: ScheduleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Schedules', async () => {
    await navBarPage.goToEntity('schedule');
    scheduleComponentsPage = new ScheduleComponentsPage();
    await browser.wait(ec.visibilityOf(scheduleComponentsPage.title), 5000);
    expect(await scheduleComponentsPage.getTitle()).to.eq('ghemApp.schedule.home.title');
    await browser.wait(ec.or(ec.visibilityOf(scheduleComponentsPage.entities), ec.visibilityOf(scheduleComponentsPage.noResult)), 1000);
  });

  it('should load create Schedule page', async () => {
    await scheduleComponentsPage.clickOnCreateButton();
    scheduleUpdatePage = new ScheduleUpdatePage();
    expect(await scheduleUpdatePage.getPageTitle()).to.eq('ghemApp.schedule.home.createOrEditLabel');
    await scheduleUpdatePage.cancel();
  });

  it('should create and save Schedules', async () => {
    const nbButtonsBeforeCreate = await scheduleComponentsPage.countDeleteButtons();

    await scheduleComponentsPage.clickOnCreateButton();

    await promise.all([
      scheduleUpdatePage.setNameInput('name'),
      scheduleUpdatePage.setDayOfWeekInput('5'),
      scheduleUpdatePage.setCreatedInput('2000-12-31'),
      scheduleUpdatePage.setModifiedInput('2000-12-31')
    ]);

    expect(await scheduleUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await scheduleUpdatePage.getDayOfWeekInput()).to.eq('5', 'Expected dayOfWeek value to be equals to 5');
    expect(await scheduleUpdatePage.getCreatedInput()).to.eq('2000-12-31', 'Expected created value to be equals to 2000-12-31');
    expect(await scheduleUpdatePage.getModifiedInput()).to.eq('2000-12-31', 'Expected modified value to be equals to 2000-12-31');
    const selectedArchival = scheduleUpdatePage.getArchivalInput();
    if (await selectedArchival.isSelected()) {
      await scheduleUpdatePage.getArchivalInput().click();
      expect(await scheduleUpdatePage.getArchivalInput().isSelected(), 'Expected archival not to be selected').to.be.false;
    } else {
      await scheduleUpdatePage.getArchivalInput().click();
      expect(await scheduleUpdatePage.getArchivalInput().isSelected(), 'Expected archival to be selected').to.be.true;
    }

    await scheduleUpdatePage.save();
    expect(await scheduleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await scheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Schedule', async () => {
    const nbButtonsBeforeDelete = await scheduleComponentsPage.countDeleteButtons();
    await scheduleComponentsPage.clickOnLastDeleteButton();

    scheduleDeleteDialog = new ScheduleDeleteDialog();
    expect(await scheduleDeleteDialog.getDialogTitle()).to.eq('ghemApp.schedule.delete.question');
    await scheduleDeleteDialog.clickOnConfirmButton();

    expect(await scheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
