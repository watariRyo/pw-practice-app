import test, { expect } from '@playwright/test'

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://www.uitestingplayground.com/ajax')
  await page.getByText('Button Triggering AJAX Request').click()
  testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto wating', async ({ page }) => {
  const successButton = page.locator('.bg-success')

  await successButton.click()

  // get target text content.
  // const text = await successButton.textContent()
  // expect(text).toEqual('Data loaded with AJAX get request.')

  // wait all text contents(get array).
  // await successButton.waitFor({ state: 'attached' })
  // const text = await successButton.allTextContents()

  // expect(text).toContain('Data loaded with AJAX get request.')

  // use timeout and get text content.
  await expect(successButton).toHaveText('Data loaded with AJAX get request.', {
    timeout: 20000,
  })
})

test('alternative waits', async ({ page }) => {
  const successButton = page.locator('.bg-success')

  // wait for element
  // await page.waitForSelector('.bg-success')

  // wait for particular response
  await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata')

  // wait for network calls to be completed (NOT RECOMENDED)
  // await page.waitForLoadState('networkidle')

  // wait hard cording
  // await page.waitForTimeout(5000)

  const text = await successButton.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeout', async ({ page }) => {
//   test.setTimeout(16000)
  test.slow()
  const successButton = page.locator('.bg-success')
  await successButton.click({timeout: 16000})
})
