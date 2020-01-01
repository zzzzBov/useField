import { fieldReducer } from './fieldReducer';
import {
  createCleanAction,
  createResetAction,
  createSetAction,
  createTouchAction,
} from '../actions';

describe(`fieldReducer(state, action)`, () => {
  it(`should return the existing state when a no-op action is dispatched`, () => {
    const state = {
      dirty: false,
      value: '',
    };

    const action = {
      type: 'NOOP',
    };

    const result = fieldReducer(state, action as any);

    expect(result).toBe(state);
  });

  it(`should not be dirty when a clean action is dispatched`, () => {
    const state = {
      dirty: true,
      value: '',
    };

    const action = createCleanAction();

    const result = fieldReducer(state, action);

    expect(result).toEqual({
      dirty: false,
      value: '',
    });
  });

  it(`should not change the state if it's already clean and a clean action is dispatched`, () => {
    const state = {
      dirty: false,
      value: '',
    };

    const action = createCleanAction();

    const result = fieldReducer(state, action);

    expect(result).toBe(state);
  });

  it(`should reset the state when a reset action is dispatched`, () => {
    const state = {
      dirty: true,
      value: 'example',
    };

    const action = createResetAction('');

    const result = fieldReducer(state, action);

    expect(result).toEqual({
      dirty: false,
      value: '',
    });
  });

  it(`should set the state when a set action is dispatched`, () => {
    const state = {
      dirty: false,
      value: '',
    };

    const action = createSetAction('example');

    const result = fieldReducer(state, action);

    expect(result).toEqual({
      dirty: false,
      value: 'example',
    });
  });

  it(`should not change the state if it's already set to the value in a set action`, () => {
    const state = {
      dirty: false,
      value: 'example',
    };

    const action = createSetAction('example');

    const result = fieldReducer(state, action);

    expect(result).toBe(state);
  });

  it(`should be dirty when a touch action is dispatched`, () => {
    const state = {
      dirty: false,
      value: '',
    };

    const action = createTouchAction();

    const result = fieldReducer(state, action);

    expect(result).toEqual({
      dirty: true,
      value: '',
    });
  });

  it(`should not change the state if it's already dirty and a touch action is dispatched`, () => {
    const state = {
      dirty: true,
      value: '',
    };

    const action = createTouchAction();

    const result = fieldReducer(state, action);

    expect(result).toBe(state);
  });
});
