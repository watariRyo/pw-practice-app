import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => {
  // by Tag naem
  await page.locator('input')

  // by ID
  await page.locator('#inputEmail')

  // by Class Value
  await page.locator('.shape-rectangle')

  // by attribute
  await page.locator('[placeholder="Email"]')

  // by Class value {full}
  await page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  )

  // combine dufferent selectors
  await page.locator('input[placeholder="Email"][nbinput]')

  // by XPath(Not Recommended)
  await page.locator('//*[@id="inputEmail"]')

  // by partial text match
  await page.locator(':text("Using")')

  // by exact text match
  await page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).first().click()
  await page.getByRole('button', { name: 'Sign in' }).first().click()

  await page.getByLabel('Email').first().click()

  await page.getByPlaceholder('Jange Doe').click()

  await page.getByText('Using the Grid').click()

  await page.getByTitle('IoT Dashboard').click()

  await page.getByTestId('SignIn').click()
})

test('locating child elements', async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page
    .locator('nb-card')
    .locator('nb-radio')
    .locator(':text-is("Option 2')
    .click()

  await page
    .locator('nb-card')
    .getByRole('button', { name: 'Sign in' })
    .first()
    .click()

  await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent element', async ({ page }) => {
  await page
    .locator('nb-card', { hasText: 'Using the Grid' })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page
    .locator('nb-card', { has: page.locator('#inputEmail') })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page
    .locator('nb-card')
    .filter({ hasText: 'Basic form' })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page
    .locator('nb-card')
    .filter({ has: page.locator('.status-danger') })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page
    .locator('nb-card')
    .filter({ has: page.locator('.nb-checkbox') })
    .filter({ hasText: 'Sign in' })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page
    .locator(':text-is("Using the Grid")')
    .locator('..')
    .getByRole('textbox', { name: 'Email' })
    .click()
})

test('Reusing the locators', async ({ page }) => {
  const basigForm = page.locator('nb-card').filter({ hasText: 'Basic form' })

  const emailField = basigForm.getByRole('textbox', { name: 'Email' })
  const passwordField = basigForm.getByRole('textbox', { name: 'Password' })

  await emailField.fill('test@test.com')
  await passwordField.fill('Welcome123')
  await basigForm.locator('nb-checkbox').click()
  await basigForm.getByRole('button').click()

  await expect(emailField).toHaveValue('test@test.com')
})

test('extracking value', async ({ page }) => {
  // single test value
  const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonsLabels).toContain('Option 1')

  // input value
  const emailField = basicForm.getByRole('textbox', { name: 'Email' })
  await emailField.fill('test@test.com')
  const emailValue = await emailField.inputValue()

  expect(emailValue).toEqual('test@test.com')

  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})

test('assertions', async ({ page }) => {
  const basicFormButton = page
    .locator('nb-card')
    .filter({ hasText: 'Basic form' })
    .locator('button')
  // General assertion
  const value = 5
  expect(value).toEqual(5)

  const text = await basicFormButton.textContent
  expect(text).toEqual('Submit')

  // Locator assertion
  await expect(basicFormButton).toHaveText('Submit')

  // Soft Assertion（失敗しても後続を続ける）
  await expect.soft(basicFormButton).toHaveText('Submit5')
  await basicFormButton.click()
})
