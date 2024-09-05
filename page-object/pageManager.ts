import { Page } from '@playwright/test'
import { NavigationPage } from './navigationPage'
import { FormLayoutPage } from './formLayoutsPage'
import { DatepickerPage } from './datepickerPage'

export class PageManager {
  private readonly page: Page
  private readonly navigationPage: NavigationPage
  private readonly formLayoutsPage: FormLayoutPage
  private readonly datepickerPage: DatepickerPage

  constructor(page: Page) {
    this.page = page
    this.navigationPage = new NavigationPage(this.page)
    this.formLayoutsPage = new FormLayoutPage(this.page)
    this.datepickerPage = new DatepickerPage(this.page)
  }

  navigateTo() {
    return this.navigationPage
  }

  onFormLayoutsPage() {
    return this.formLayoutsPage
  }

  onDatepickerPage() {
    return this.datepickerPage
  }
}
