var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set search text', () => {
      //What action are we dispatching?
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'hello'
      };
      //Dispatch to the reducer we are testing,
      // (note we are using deep-freeze-strict to make sure the reducer is
      // actually a pure function and not modifying the arguments, using df())
      var res = reducers.searchTextReducer(df(''), df(action));
      //Assert that the result is that the text changed
      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedtReducer', () => {
    it('should toggle show completed', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedtReducer(df(false), df(action));
      expect(res).toEqual(true);
    });
  });
});
