import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import CardHeader from '../Card/CardHeader';

describe('CardHeader Component', () => {
  const mockStore = configureMockStore();

  describe('Edit button component', () => {
    test('not renders edit button  in readonly mode', () => {
      const store = mockStore({
        cards: {
          readOnly: false,
        },
      });

      render(
        <Provider store={store}>
          <CardHeader />
        </Provider>
      );

      const editButtonElement = screen.queryByTestId('editButton');

      expect(editButtonElement).toBeInTheDocument();
    });

    test('renders edit button in not readonly mode', () => {
      const store = mockStore({
        cards: {
          readOnly: true,
        },
      });

      render(
        <Provider store={store}>
          <CardHeader />
        </Provider>
      );

      const editButtonElement = screen.queryByTestId('editButton');

      expect(editButtonElement).not.toBeInTheDocument();
    });

    test('responds to click on edit button', () => {
      const store = mockStore({
        cards: {
          readOnly: false,
        },
      });

      const onClickEditButtonMock = jest.fn();

      render(
        <Provider store={store}>
          <CardHeader clickEditButtonHandler={onClickEditButtonMock} />
        </Provider>
      );

      const editButtonElement = screen.queryByTestId('editButton');

      fireEvent.click(editButtonElement);

      expect(onClickEditButtonMock).toHaveBeenCalled();
    });
  });

  describe('Save and cancel buttons and textarea components', () => {
    test('renders textarea, save and cancel buttons in card editing mode', () => {
      const store = mockStore({
        cards: {
          readOnly: false,
        },
      });

      render(
        <Provider store={store}>
          <CardHeader isEditing={true} />
        </Provider>
      );

      const saveButtonElement = screen.getByTestId('saveButton');
      const cancelButtonElement = screen.getByTestId('cancelButton');
      const textareaElement = screen.getByTestId('headerInput');

      expect(saveButtonElement).toBeInTheDocument();
      expect(cancelButtonElement).toBeInTheDocument();
      expect(textareaElement).toBeInTheDocument();
    });

    test('not renders textarea, save and cancel buttons in not card editing mode', () => {
      const store = mockStore({
        cards: {
          readOnly: false,
        },
      });

      const { rerender } = render(
        <Provider store={store}>
          <CardHeader isEditing={true} />
        </Provider>
      );

      const saveButtonElement = screen.getByTestId('saveButton');
      const cancelButtonElement = screen.getByTestId('cancelButton');
      const textareaElement = screen.getByTestId('headerInput');

      rerender(
        <Provider store={store}>
          <CardHeader isEditing={false} />
        </Provider>
      );

      expect(saveButtonElement).not.toBeInTheDocument();
      expect(cancelButtonElement).not.toBeInTheDocument();
      expect(textareaElement).not.toBeInTheDocument();
    });

    test('check if textarea has text in card editing mode', () => {
      const store = mockStore({
        cards: {
          readOnly: false,
        },
      });

      render(
        <Provider store={store}>
          <CardHeader
            isEditing={true}
            editedTitle="Bulbasaur"
            titleChangeHandler={jest.fn()}
          />
        </Provider>
      );

      const expectedText = 'Bulbasaur';

      const textareaElement = screen.getByTestId('headerInput');
      expect(textareaElement).toHaveValue(expectedText);
    });

    test('check if textarea has text in not card editing mode', () => {
      const store = mockStore({
        cards: {
          readOnly: false,
        },
      });

      render(
        <Provider store={store}>
          <CardHeader isEditing={false} title="Bulbasaur" />
        </Provider>
      );

      const expectedText = 'Bulbasaur';

      const titleElement = screen.getByTestId('headerTitle');
      expect(titleElement.textContent).toBe(expectedText);
    });

    test('responds to click on save button', () => {
      const store = mockStore({
        cards: {
          readOnly: false,
        },
      });

      const onClickSaveButtonMock = jest.fn();

      render(
        <Provider store={store}>
          <CardHeader
            isEditing={true}
            clickSaveButtonHandler={onClickSaveButtonMock}
          />
        </Provider>
      );

      const saveButtonElement = screen.queryByTestId('saveButton');

      fireEvent.click(saveButtonElement);

      expect(onClickSaveButtonMock).toHaveBeenCalled();
    });

    test('responds to click on cancel button', () => {
      const store = mockStore({
        cards: {
          readOnly: false,
        },
      });

      const onClickCancelButtonMock = jest.fn();

      render(
        <Provider store={store}>
          <CardHeader
            isEditing={true}
            clickCancelButtonHandler={onClickCancelButtonMock}
          />
        </Provider>
      );

      const cancelButtonElement = screen.queryByTestId('cancelButton');

      fireEvent.click(cancelButtonElement);

      expect(onClickCancelButtonMock).toHaveBeenCalled();
    });

    test('auto resizes textarea in editing mode', () => {
      const store = mockStore({
        cards: {
          readOnly: false,
        },
      });

      render(
        <Provider store={store}>
          <CardHeader
            isEditing={true}
            editedTitle="Bulbasaur can be seen napping in bright sunlight."
            titleChangeHandler={jest.fn()}
          />
        </Provider>
      );

      const textareaElement = screen.getByTestId('headerInput');
      const currentHeight = textareaElement.offsetHeight + 'px';

      expect(textareaElement.style.height).toBe(currentHeight);
    });
  });

  describe('Checkbox component', () => {
    test('not renders checkbox in readonly mode', () => {
      const store = mockStore({
        cards: {
          readOnly: false,
        },
      });

      render(
        <Provider store={store}>
          <CardHeader />
        </Provider>
      );

      const checkboxElement = screen.queryByRole('checkbox');

      expect(checkboxElement).toBeInTheDocument();
    });

    test('renders checkbox in not readonly mode', () => {
      const store = mockStore({
        cards: {
          readOnly: true,
        },
      });

      render(
        <Provider store={store}>
          <CardHeader />
        </Provider>
      );

      const checkboxElement = screen.queryByRole('checkbox');

      expect(checkboxElement).not.toBeInTheDocument();
    });

    test('toggle checkbox value on click', () => {
      const store = mockStore({
        cards: {
          readOnly: false,
        },
      });

      const onChangeMock = jest.fn();

      render(
        <Provider store={store}>
          <CardHeader isEditing={false} checkboxChangeHandler={onChangeMock} />
        </Provider>
      );

      const checkboxElement = screen.getByTestId('cardCheckbox');

      fireEvent.click(checkboxElement);

      expect(checkboxElement).toBeChecked();
      expect(onChangeMock).toHaveBeenCalled();
    });
  });
});
