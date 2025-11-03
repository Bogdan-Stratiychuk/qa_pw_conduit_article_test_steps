import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { ArticlePage } from '../../src/pages/ArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
let articlePage;
let article;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  articlePage = new ArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  article = {
    title: faker.book.title(),
    description: faker.lorem.words({min: 1, max: 5}),
    body: faker.lorem.paragraph({min: 1, max: 5}),
    tags: faker.lorem.words(1),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('Creat an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});

test('Creat an article without description field', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillArticleBodyField(article.body);
  await createArticlePage.fillTagsField(article.tags);

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText('Article description cannot be empty');
});

test('Creat an article without body field', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTagsField(article.tags);

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText('Article body cannot be empty');
});

test('Creat an article without tags field', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillArticleBodyField(article.body);

  await createArticlePage.clickPublishArticleButton();
  await articlePage.assertArticleTitle(article.title);
});