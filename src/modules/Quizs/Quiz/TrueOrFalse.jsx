// @flow
import cx from 'classnames'
import Button from 'components/Button'
import PropTypes from 'prop-types'
import * as React from 'react'
import {compose, setPropTypes, withHandlers, withPropsOnChange} from 'recompose'
import addScoreWhenFinished from './addScoreWhenFinished'
import ResultIndicator from './ResultIndicator'

type Props = {
  data: {
    isTrue: boolean,
    text: string,
  },
  finished: boolean,
  handleAnswer: Function,
  number: number,
  score: number,
  state: {
    answer?: boolean,
  },
  t: {
    quizFalse: string,
    quizTrue: string,
    localePath: string,
  },
}
const TrueOrFalse = ({
  data: {isTrue, text},
  finished,
  handleAnswer,
  number,
  score,
  state: {answer},
  t: {quizFalse, quizTrue, localePath},
}: Props) => (
  <div>
    <div className="flex">
      <div className="flex-no-shrink w2-5 b">{number} -</div>
      <div className="f4 b">{text}</div>
    </div>
    <div className="mt4 flex justify-between">
      <div>
        <div className="mt2">
          <ResultIndicator
            finished={finished}
            isCorrect={isTrue}
            selected={answer === true}
          />
          <Button
            className={cx({
              ph3: answer,
            })}
            greenStroked={finished && isTrue && answer !== true}
            name="true"
            onClick={handleAnswer}
            rounded
            secondary
            stroked={!answer}
          >
            {quizTrue}
          </Button>
        </div>
        <div className="mt2">
          <ResultIndicator
            finished={finished}
            isCorrect={!isTrue}
            selected={answer === false}
          />
          <Button
            className={cx({
              ph3: answer === false,
            })}
            greenStroked={finished && !isTrue && answer !== false}
            name="false"
            onClick={handleAnswer}
            rounded
            secondary
            stroked={answer !== false}
          >
            {quizFalse}
          </Button>
        </div>
      </div>
      {finished &&
        (score ? (
          <div
            className={cx('self-end green f3', {
              tl: localePath === '/',
              tr: localePath !== '/',
            })}
          >
            1/1
          </div>
        ) : (
          <div
            className={cx('self-end green f3', {
              tl: localePath === '/',
              tr: localePath !== '/',
            })}
          >
            0/1
          </div>
        ))}
    </div>
  </div>
)

const enhance = compose(
  setPropTypes({
    addData: PropTypes.func.isRequired,
    addScore: PropTypes.func.isRequired,
    finished: PropTypes.bool.isRequired,
    quizId: PropTypes.string.isRequired,
  }),
  withHandlers({
    handleAnswer: ({addData, finished, quizId, state: {answer}}) => (e) => {
      const newAnswer = e.target.name === 'true'
      if (!finished)
        addData({
          data: {
            answer: answer === newAnswer ? undefined : newAnswer,
          },
          quizId,
          started: true,
        })
    },
  }),
  withPropsOnChange(
    ['finished'],
    ({data: {isTrue}, finished, state: {answer}}) => {
      if (!finished) {
        return {score: 0}
      }
      return {
        score: answer === isTrue ? 1 : 0,
      }
    },
  ),
  addScoreWhenFinished,
)
export default enhance(TrueOrFalse)
