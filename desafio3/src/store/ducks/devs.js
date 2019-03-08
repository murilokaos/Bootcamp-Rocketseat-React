/** **
 *
 * Types
 *
 */

export const Types = {
  ADD_REQUEST: 'devs/ADD_REQUEST',
  // TODO: criar os outros types
};

/** **
 *
 * Reducers
 *
 */

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
};

export default function devs(state = INITIAL_STATE, action) {
  switch (action.type) {
    // TODO: criar os reducers
    default:
      return state;
  }
}

/** *
 *
 * Actions
 *
 */

export const Creators = {
  // TODO: criar as actions
};
