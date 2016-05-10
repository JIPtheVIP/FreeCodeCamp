import { handleActions } from 'redux-actions';

import types from './types';
import { setChallenge, fetchChallengeCompleted } from '../../../redux/types';

const initialState = {
  challenge: '',
  currentStep: 0,
  previousStep: -1,
  content: null
};

function arrayToNewLineString(seedData = []) {
  seedData = Array.isArray(seedData) ? seedData : [seedData];
  return seedData.reduce((seed, line) => '' + seed + line + '\n', '\n');
}

function buildSeed({ challengeSeed = [] } = {}) {
  return arrayToNewLineString(challengeSeed);
}

export default handleActions(
  {
    [types.resetStep]: () => initialState,
    [types.goToStep]: (state, { payload: step = 0 }) => ({
      ...state,
      currentStep: step,
      previousStep: state.currentStep
    }),
    [fetchChallengeCompleted]: (state, { payload = '' }) => ({
      ...state,
      challenge: payload
    }),
    [setChallenge]: (state, { payload: challenge }) => ({
      ...state,
      challenge: challenge.dashedName,
      content: buildSeed(challenge)
    })
  },
  initialState
);