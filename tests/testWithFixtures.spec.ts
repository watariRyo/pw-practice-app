import { test } from '../test-options'

test('parametrized methods', async ({ pageManager }) => {
  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      'test@test.com',
      'Welcome1',
      'Option 1'
    )
  await pageManager
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      'John Smith',
      'John@example.com',
      true
    )
})
