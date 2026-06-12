import { useDispatch } from 'react-redux'

import icon from '../../../../shared/static/icon/icon.png'
import Button from '../../../shared/components/atoms/button.js'
import { useSelector } from '../../../shared/state/hooks.js'
import {
  clickedHomepageButton,
  clickedOpenIssueButton,
  clickedOpenUpstreamButton,
  clickedSupportButton,
} from '../../state/actions.js'
import { Pane } from '../molecules/pane.js'

export const AboutPane = (): JSX.Element => {
  const dispatch = useDispatch()
  const version = useSelector((state) => state.data.version)

  return (
    <Pane pane="about">
      <div className="m-auto flex w-full max-w-sm flex-col items-center text-center">
        <img alt="Browserosaurus logo" className="w-16" src={icon} />

        <h1 className="mt-2 text-3xl tracking-wider text-gray-900 dark:text-gray-50">
          Browserosaurus
        </h1>
        <p className="mt-1 text-sm opacity-70">
          The browser prompter for macOS
        </p>
        <p className="mt-1 text-xs opacity-50">Version {version}</p>

        <div className="mt-4 w-full space-y-1.5 rounded-lg border border-gray-400 bg-black/5 p-3 text-xs leading-relaxed dark:border-black dark:bg-black/30">
          <p className="text-gray-900 dark:text-gray-50">
            Maintained and published by Filip Mares
          </p>
          <p>
            Originally created by Will Stone —{' '}
            <button
              className="inline underline underline-offset-2 hover:opacity-70 active:opacity-50"
              onClick={() => dispatch(clickedSupportButton())}
              type="button"
            >
              buy Will a coffee
            </button>
            .
          </p>
          <p className="opacity-60">
            Independent fork, not affiliated with Will Stone · GPL-3.0
          </p>
        </div>

        <div className="mt-4 grid w-full grid-cols-3 gap-2">
          <Button
            className="justify-center"
            onClick={() => dispatch(clickedHomepageButton())}
          >
            This Fork
          </Button>
          <Button
            className="justify-center"
            onClick={() => dispatch(clickedOpenUpstreamButton())}
          >
            Original
          </Button>
          <Button
            className="justify-center"
            onClick={() => dispatch(clickedOpenIssueButton())}
          >
            Report Issue
          </Button>
        </div>
      </div>
    </Pane>
  )
}
