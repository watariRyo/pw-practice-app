import test, { expect } from '@playwright/test'

test('input field', async ({ page }, testInfo) => {
  await page.goto('/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()

  if (testInfo.project.name == 'mobile') {
    
  }

  const usingTheGridEmailInput = page
    .locator('nb-card', { hasText: 'Using the Grid' })
    .getByRole('textbox', { name: 'email' })


  await usingTheGridEmailInput.fill('test@test.com')
  await usingTheGridEmailInput.clear()
  await usingTheGridEmailInput.pressSequentially('test2@test.com', {
    delay: 500,
  })
})
