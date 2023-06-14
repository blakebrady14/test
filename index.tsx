import React, { createContext, useContext, useReducer } from 'react';
import { Box, Button, Text } from '@mantine/core';

// Define the initial state
const initialState = {
  firstNumber: 0,
  secondNumber: 0,
  numbers: [],
};

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'doNothing':
      return { ...state };
    case 'addToFirst':
      return {
        ...state,
        firstNumber: state.firstNumber + 1,
        numbers: [state.firstNumber + 1],
      };
    case 'addToSecond':
      return {
        ...state,
        secondNumber: state.secondNumber + 1,
        numbers: [state.firstNumber],
      };
    default:
      return state;
  }
};

// Create the context
const AppContext = createContext();

// Create the provider component
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hooks for accessing the state and dispatch
const useAppState = () => {
  const { state } = useContext(AppContext);
  return state;
};

const useAppDispatch = () => {
  const { dispatch } = useContext(AppContext);
  return dispatch;
};

const DoNothingButton = () => {
  const dispatch = useAppDispatch();
  return (
    <Button size="xl" onClick={() => dispatch({ type: 'doNothing' })}>
      Do Nothing
    </Button>
  );
};

const AddToFirstButton = () => {
  const dispatch = useAppDispatch();
  return (
    <Button size="xl" onClick={() => dispatch({ type: 'addToFirst' })}>
      Add To First
    </Button>
  );
};

const FirstValue = () => {
  const { firstNumber } = useAppState();
  return (
    <Text size="xl" p={5}>
      First value: {firstNumber}
    </Text>
  );
};

const AddToSecondButton = () => {
  const dispatch = useAppDispatch();
  return (
    <Button size="xl" onClick={() => dispatch({ type: 'addToSecond' })}>
      Add To Second
    </Button>
  );
};

const SecondValue = () => {
  const { secondNumber } = useAppState();
  return (
    <Text size="xl" p={5}>
      Second value: {secondNumber}
    </Text>
  );
};

const NumbersValue = () => {
  const { numbers } = useAppState();
  return (
    <Text size="xl" p={5}>
      Numbers: {numbers.join(', ')}
    </Text>
  );
};

function App() {
  return (
    <AppProvider>
      <Box p={10}>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <DoNothingButton />
        </Box>
        <Box
          mt={10}
          sx={{
            display: 'flex',
          }}
        >
          <AddToFirstButton />
          <FirstValue />
        </Box>
        <Box
          mt={10}
          sx={{
            display: 'flex',
          }}
        >
          <AddToSecondButton />
          <SecondValue />
        </Box>
      </Box>
      <NumbersValue />
    </AppProvider>
  );
}

export default App;
