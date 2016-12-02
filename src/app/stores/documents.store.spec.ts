import {documents} from './documents.store';

describe('`documents` store', () => {
  let initialState = [
    { id: 1, title: 'Test document', text: 'This *is* a test.', rendered_text:  'This <b>is</b> a test.'},
    { id: 2, title: 'Bogus document', text: 'This statement is false', rendered_text:  'This statement is false.'} }
  ];

  it('returns an empty array by default', () => {
    let defaultState = items(undefined, {type: 'random', payload: {}});

    expect(defaultState).toEqual([]);
  });

  it('`ADD_DOCUMENTS`', () => {
    let payload = initialState,
      stateItems = items([], {type: 'ADD_DOCUMENTS', payload: payload});

    expect(stateItems).toEqual(payload);
  });

  it('`CREATE_ITEM`', () => {
    let payload = {id: 2, name: 'added item'},
      result = [...initialState, payload],
      stateItems = items(initialState, {type: 'CREATE_ITEM', payload: payload});

    expect(stateItems).toEqual(result);
  });

  it('`UPDATE_ITEM`', () => {
    let payload = { id: 1, name: 'Updated Item' },
      result = [ initialState[0], { id: 1, name: 'Updated Item' } ],
      stateItems = items(initialState, {type: 'UPDATE_ITEM', payload: payload});

    expect(stateItems).toEqual(result);
  });

  it('`DELETE_ITEM`', () => {
    let payload = { id: 0 },
      result = [ initialState[1] ],
      stateItems = items(initialState, {type: 'DELETE_ITEM', payload: payload});

    expect(stateItems).toEqual(result);
  });
});
