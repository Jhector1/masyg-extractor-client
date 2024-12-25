import { useReducer } from 'react';

const usePagination = () => {
  const initialState = { page: 10 };

  function reducer(
    state: { page: number },
    action: { type: string; value?: number }
  ) {
    switch (action.type) {
      case 'increment':
        return { page: state.page + 10 };
      case 'decrement':
        return { page: Math.max(0, state.page - 10) }; // Prevent negative page
      case 'goto':
        return { page: action.value ?? 0 };
      default:
        throw new Error('Unknown action type');
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return { currentPage: state.page, dispatch };
};

export default usePagination;
