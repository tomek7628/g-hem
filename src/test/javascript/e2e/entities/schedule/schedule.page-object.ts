import { element, by, ElementFinder } from 'protractor';

export class ScheduleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-schedule div table .btn-danger'));
  title = element.all(by.css('jhi-schedule div h2#page-heading span')).first();
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

export class ScheduleUpdatePage {
  pageTitle = element(by.id('jhi-schedule-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  dayOfWeekInput = element(by.id('field_dayOfWeek'));
  createdInput = element(by.id('field_created'));
  modifiedInput = element(by.id('field_modified'));
  archivalInput = element(by.id('field_archival'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDayOfWeekInput(dayOfWeek: string): Promise<void> {
    await this.dayOfWeekInput.sendKeys(dayOfWeek);
  }

  async getDayOfWeekInput(): Promise<string> {
    return await this.dayOfWeekInput.getAttribute('value');
  }

  async setCreatedInput(created: string): Promise<void> {
    await this.createdInput.sendKeys(created);
  }

  async getCreatedInput(): Promise<string> {
    return await this.createdInput.getAttribute('value');
  }

  async setModifiedInput(modified: string): Promise<void> {
    await this.modifiedInput.sendKeys(modified);
  }

  async getModifiedInput(): Promise<string> {
    return await this.modifiedInput.getAttribute('value');
  }

  getArchivalInput(): ElementFinder {
    return this.archivalInput;
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

export class ScheduleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-schedule-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-schedule'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
