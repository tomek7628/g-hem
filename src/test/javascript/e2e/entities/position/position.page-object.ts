import { element, by, ElementFinder } from 'protractor';

export class PositionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-position div table .btn-danger'));
  title = element.all(by.css('jhi-position div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PositionUpdatePage {
  pageTitle = element(by.id('jhi-position-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  positionInput = element(by.id('field_position'));

  scheduleSelect = element(by.id('field_schedule'));
  exerciseSelect = element(by.id('field_exercise'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPositionInput(position: string): Promise<void> {
    await this.positionInput.sendKeys(position);
  }

  async getPositionInput(): Promise<string> {
    return await this.positionInput.getAttribute('value');
  }

  async scheduleSelectLastOption(): Promise<void> {
    await this.scheduleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async scheduleSelectOption(option: string): Promise<void> {
    await this.scheduleSelect.sendKeys(option);
  }

  getScheduleSelect(): ElementFinder {
    return this.scheduleSelect;
  }

  async getScheduleSelectedOption(): Promise<string> {
    return await this.scheduleSelect.element(by.css('option:checked')).getText();
  }

  async exerciseSelectLastOption(): Promise<void> {
    await this.exerciseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async exerciseSelectOption(option: string): Promise<void> {
    await this.exerciseSelect.sendKeys(option);
  }

  getExerciseSelect(): ElementFinder {
    return this.exerciseSelect;
  }

  async getExerciseSelectedOption(): Promise<string> {
    return await this.exerciseSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PositionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-position-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-position'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
