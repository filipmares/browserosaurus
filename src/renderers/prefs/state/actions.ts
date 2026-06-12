import type { AppName } from '../../../config/apps.js'
import type { PrefsTab } from '../../../shared/state/reducer.data.js'
import { actionNamespacer } from '../../../shared/utils/action-namespacer.js'

const prefs = actionNamespacer('prefs')

const startedPrefs = prefs('started')

const clickedTabButton = prefs<PrefsTab>('tab-button/clicked')

const clickedSetAsDefaultBrowserButton = prefs(
  'set-as-default-browser-button/clicked',
)

const clickedRescanApps = prefs('rescan-apps/clicked')
const clickedUpdateButton = prefs('update-button/clicked')
const confirmedReset = prefs('reset/confirmed')

const updatedHotCode = prefs<{ appName: AppName; value: string }>(
  'hot-code/updated',
)

const reorderedApp = prefs<{ sourceName: AppName; destinationName: AppName }>(
  'app/reordered',
)

const savedDomainAssociation = prefs<{ domain: string; appName: AppName }>(
  'domain-association/saved',
)
const removedDomainAssociation = prefs<{ domain: string }>(
  'domain-association/removed',
)
const updatedDomainAssociation = prefs<{ domain: string; appName: AppName }>(
  'domain-association/updated',
)

const clickedHomepageButton = prefs('homepage-button/clicked')
const clickedOpenIssueButton = prefs('open-issue-button/clicked')

export {
  clickedHomepageButton,
  clickedOpenIssueButton,
  clickedRescanApps,
  clickedSetAsDefaultBrowserButton,
  clickedTabButton,
  clickedUpdateButton,
  confirmedReset,
  removedDomainAssociation,
  reorderedApp,
  savedDomainAssociation,
  startedPrefs,
  updatedDomainAssociation,
  updatedHotCode,
}
