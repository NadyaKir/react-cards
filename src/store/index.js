import { configureStore, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { logActionMiddleware } from './logActionMiddleware';

const initialCardsState = {
  // items: [],
  items: [{ Number: '001', isEditing: true }],
  readOnly: false,
  // readOnly: true,
  isAddModalOpen: false,
  itemsCount: 0,
};

const initialLoginState = {
  isLoggedIn: false,
  isAdmin: false,
  username: '',
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialCardsState,
  reducers: {
    fetchData(state, action) {
      state.items = action.payload.items;
      state.itemsCount = action.payload.itemsCount;
    },
    setIsEditing(state, action) {
      const updatedItems = state.items.map((item) => {
        if (item.Number === action.payload.Number) {
          return {
            ...item,
            isEditing: action.payload.isEditing,
          };
        }
        return item;
      });

      state.items = updatedItems;
    },
    addItem(state, action) {
      const id = uuidv4();
      const newItem = {
        Number: id,
        Name: action.payload.title,
        About: action.payload.descr,
        isChecked: false,
        isEditing: false,
      };

      state.items = [newItem, ...state.items];
      state.isAddModalOpen = false;
      state.itemsCount = state.items.length + 1;
    },
    itemChange(state, action) {
      const updatedItems = state.items.map((item) => {
        if (item.Number === action.payload.id) {
          return {
            ...item,
            Name: action.payload.editedTitle,
            About: action.payload.editedDescr,
            isChecked: action.payload.isChecked,
            isEditing: action.payload.isEditing,
          };
        }
        return item;
      });

      state.items = updatedItems;
    },
    deleteItem(state, action) {
      const updatedItems = state.items.filter((item) => !item.isChecked);

      state.items = updatedItems;
      state.itemsCount = updatedItems.length;
    },
    openAddModal(state, action) {
      state.isAddModalOpen = true;
    },
    closeAddModal(state, action) {
      state.isAddModalOpen = false;
    },
    setReadOnly(state, action) {
      state.readOnly = action.payload.readOnly;
      state.isEditing = false;
    },
  },
});

const getInitialAuthState = () => {
  const storedAuthState = localStorage.getItem('authState');
  return storedAuthState ? JSON.parse(storedAuthState) : initialLoginState;
};

const loginSlice = createSlice({
  name: 'login',
  initialState: getInitialAuthState(),
  reducers: {
    setLogin(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isAdmin = action.payload.isAdmin;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    handleUsername(state, action) {
      state.username = action.payload.username;
      localStorage.setItem('authState', JSON.stringify(state));
    },
  },
});

const store = configureStore({
  reducer: {
    cards: cardsSlice.reducer,
    login: loginSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logActionMiddleware),
});

export const cardsActions = cardsSlice.actions;
export const loginActions = loginSlice.actions;

export default store;
