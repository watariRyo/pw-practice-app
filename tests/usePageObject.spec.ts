import test from '@playwright/test'
import { PageManager } from '../page-object'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutPage()
  await pm.navigateTo().datepickerPage()
  await pm.navigateTo().smartTablePage()
  await pm.navigateTo().toasterPage()
  await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async ({ page }) => {
  const pm = new PageManager(page)

  await pm.navigateTo().formLayoutPage()
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      'test@test.com',
      'Welcome1',
      'Option 1'
    )
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      'John Smith',
      'John@example.com',
      true
    )
  await pm.navigateTo().datepickerPage()
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(100)
  await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15)
})
