import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PositionComponentsPage, PositionDeleteDialog, PositionUpdatePage } from './position.page-object';

const expect = chai.expect;

describe('Position e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let positionComponentsPage: PositionComponentsPage;
  let positionUpdatePage: PositionUpdatePage;
  let positionDeleteDialog: PositionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Positions', async () => {
    await navBarPage.goToEntity('position');
    positionComponentsPage = new PositionComponentsPage();
    await browser.wait(ec.visibilityOf(positionComponentsPage.title), 5000);
    expect(await positionComponentsPage.getTitle()).to.eq('ghemApp.position.home.title');
    await browser.wait(ec.or(ec.visibilityOf(positionComponentsPage.entities), ec.visibilityOf(positionComponentsPage.noResult)), 1000);
  });

  it('should load create Position page', async () => {
    await positionComponentsPage.clickOnCreateButton();
    positionUpdatePage = new PositionUpdatePage();
    expect(await positionUpdatePage.getPageTitle()).to.eq('ghemApp.position.home.createOrEditLabel');
    await positionUpdatePage.cancel();
  });

  it('should create and save Positions', async () => {
    const nbButtonsBeforeCreate = await positionComponentsPage.countDeleteButtons();

    await positionComponentsPage.clickOnCreateButton();

    await promise.all([
      positionUpdatePage.setPositionInput('5'),
      positionUpdatePage.scheduleSelectLastOption(),
      positionUpdatePage.exerciseSelectLastOption()
    ]);

    expect(await positionUpdatePage.getPositionInput()).to.eq('5', 'Expected position value to be equals to 5');

    await positionUpdatePage.save();
    expect(await positionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await positionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Position', async () => {
    const nbButtonsBeforeDelete = await positionComponentsPage.countDeleteButtons();
    await positionComponentsPage.clickOnLastDeleteButton();

    positionDeleteDialog = new PositionDeleteDialog();
    expect(await positionDeleteDialog.getDialogTitle()).to.eq('ghemApp.position.delete.question');
    await positionDeleteDialog.clickOnConfirmButton();

    expect(await positionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
