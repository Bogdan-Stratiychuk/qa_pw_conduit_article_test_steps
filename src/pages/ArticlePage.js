import { expect, test } from "@playwright/test";

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('div.banner h1');

  }

  async assertArticleTitle(text) {
    await test.step(`Assert the article 'Title' is '${text}'`, async () => {
      await expect(this.articleTitle).toContainText(text);
    })
  }
}