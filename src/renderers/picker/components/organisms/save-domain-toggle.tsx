import clsx from 'clsx'
import { useDispatch } from 'react-redux'

import { extractDomain } from '../../../../shared/utils/extract-domain.js'
import { useSelector } from '../../../shared/state/hooks.js'
import { toggledSaveDomain } from '../../state/actions.js'

const SaveDomainToggle = (): JSX.Element | null => {
  const dispatch = useDispatch()
  const url = useSelector((state) => state.data.url)
  const saveDomainForUrl = useSelector((state) => state.data.saveDomainForUrl)

  const domain = extractDomain(url)

  if (!domain) return null

  return (
    <label
      className={clsx(
        'flex w-full shrink-0 cursor-default items-center gap-2 px-4 py-1 text-xs no-drag',
        'text-black/70 dark:text-white/70',
      )}
    >
      <input
        aria-label={`Always open ${domain} with the selected browser`}
        checked={saveDomainForUrl}
        className="accent-blue-500"
        onChange={(event) => dispatch(toggledSaveDomain(event.target.checked))}
        type="checkbox"
      />
      <span className="truncate">
        Always open{' '}
        <span className="font-semibold">{domain}</span> with this browser
      </span>
    </label>
  )
}

export default SaveDomainToggle
