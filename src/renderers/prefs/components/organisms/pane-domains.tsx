import clsx from 'clsx'
import { useDispatch } from 'react-redux'

import type { AppName } from '../../../../config/apps.js'
import Button from '../../../shared/components/atoms/button.js'
import {
  useDeepEqualSelector,
  useInstalledApps,
} from '../../../shared/state/hooks.js'
import {
  removedDomainAssociation,
  updatedDomainAssociation,
} from '../../state/actions.js'
import { Pane } from '../molecules/pane.js'

export function DomainsPane(): JSX.Element {
  const dispatch = useDispatch()

  const installedApps = useInstalledApps()
  const installedAppNames = new Set(installedApps.map((app) => app.name))

  const domainAssociations = useDeepEqualSelector(
    (state) => state.storage.domainAssociations,
  )

  const entries = Object.entries(domainAssociations).sort(([a], [b]) =>
    a.localeCompare(b),
  )

  return (
    <Pane pane="domains">
      <div className="overflow-y-auto p-2">
        {entries.length === 0 ? (
          <p className="opacity-70">
            No domain associations yet. When the picker appears, tick{' '}
            <em>“Always open …”</em> before choosing a browser to remember your
            choice for that site.
          </p>
        ) : (
          <ul className="space-y-2">
            {entries.map(([domain, appName]) => {
              const isInstalled = installedAppNames.has(appName)
              return (
                <li
                  key={domain}
                  className={clsx(
                    'flex items-center gap-4 rounded-xl bg-black/5 p-3 shadow dark:bg-white/5',
                  )}
                >
                  <div className="grow truncate">
                    <div className="font-medium">{domain}</div>
                    {!isInstalled && (
                      <div className="text-xs text-red-600 dark:text-red-400">
                        “{appName}” isn’t installed — the picker will be shown
                        instead.
                      </div>
                    )}
                  </div>
                  <select
                    aria-label={`Browser for ${domain}`}
                    className={clsx(
                      'min-w-0 max-w-48 rounded border bg-white px-2 py-1 dark:bg-[#56555C]',
                      'border-b-[#C1BFBF] dark:border-b-[#56555C]',
                      'border-l-[#D4D2D2] dark:border-l-[#56555C]',
                      'border-r-[#D4D2D2] dark:border-r-[#56555C]',
                      'border-t-[#DAD8D8] dark:border-t-[#6E6D73]',
                    )}
                    onChange={(event) =>
                      dispatch(
                        updatedDomainAssociation({
                          appName: event.target.value as AppName,
                          domain,
                        }),
                      )
                    }
                    value={appName}
                  >
                    {!isInstalled && (
                      <option value={appName}>{appName} (not installed)</option>
                    )}
                    {installedApps.map((app) => (
                      <option key={app.name} value={app.name}>
                        {app.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    aria-label={`Remove ${domain}`}
                    onClick={() =>
                      dispatch(removedDomainAssociation({ domain }))
                    }
                  >
                    Remove
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <p className="mt-2 text-sm opacity-70">
        Links from these domains skip the picker and open in the chosen
        browser. Tick <em>“Always open …”</em> in the picker to add a new
        association.
      </p>
    </Pane>
  )
}
