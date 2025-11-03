import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder('What\'s this article about?');
    this.articleBodyField = page.getByPlaceholder('Write your article (in');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
  }

  async fillTitleField(text) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(text);
    });
  }

  async fillDescriptionField(text) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(text);
    });
  }

  async fillArticleBodyField(text) {
    await test.step(`Fill the 'Body' field`, async () => {
      await this.articleBodyField.fill(text);
    });
  }

  async fillTagsField(text) {
    await test.step(`Fill the 'Tags' field`, async () => {
      await this.tagsField.fill(text)
      await this.page.keyboard.press('Enter');
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
