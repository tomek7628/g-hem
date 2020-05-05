import { element, by, ElementFinder } from 'protractor';

export class ExerciseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-exercise div table .btn-danger'));
  title = element.all(by.css('jhi-exercise div h2#page-heading span')).first();
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

export class ExerciseUpdatePage {
  pageTitle = element(by.id('jhi-exercise-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  bodyPartSelect = element(by.id('field_bodyPart'));
  nameInput = element(by.id('field_name'));
  seriesInput = element(by.id('field_series'));
  weightInput = element(by.id('field_weight'));
  modifiedInput = element(by.id('field_modified'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setBodyPartSelect(bodyPart: string): Promise<void> {
    await this.bodyPartSelect.sendKeys(bodyPart);
  }

  async getBodyPartSelect(): Promise<string> {
    return await this.bodyPartSelect.element(by.css('option:checked')).getText();
  }

  async bodyPartSelectLastOption(): Promise<void> {
    await this.bodyPartSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setSeriesInput(series: string): Promise<void> {
    await this.seriesInput.sendKeys(series);
  }

  async getSeriesInput(): Promise<string> {
    return await this.seriesInput.getAttribute('value');
  }

  async setWeightInput(weight: string): Promise<void> {
    await this.weightInput.sendKeys(weight);
  }

  async getWeightInput(): Promise<string> {
    return await this.weightInput.getAttribute('value');
  }

  async setModifiedInput(modified: string): Promise<void> {
    await this.modifiedInput.sendKeys(modified);
  }

  async getModifiedInput(): Promise<string> {
    return await this.modifiedInput.getAttribute('value');
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

export class ExerciseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-exercise-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-exercise'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
