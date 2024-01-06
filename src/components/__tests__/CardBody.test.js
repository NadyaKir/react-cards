import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import CardBody from '../Card/CardBody';

describe('CardBody component', () => {
  const mockStore = configureMockStore();

  test('renders paragraph component in readonly mode', () => {
    const store = mockStore({
      cards: {
        readOnly: true,
      },
    });

    render(
      <Provider store={store}>
        <CardBody />
      </Provider>
    );

    const mainCardTextElement = screen.getByTestId('cardBodyParagraph');

    expect(mainCardTextElement).toBeInTheDocument();
  });

  test('renders textarea component in editing mode', () => {
    const store = mockStore({
      cards: {
        readOnly: true,
      },
    });

    render(
      <Provider store={store}>
        <CardBody isEditing={true} />
      </Provider>
    );

    const mainCardTextElement = screen.getByTestId('cardBodyTextarea');

    expect(mainCardTextElement).toBeInTheDocument();
  });

  test('check if paragraph has text in not card editing mode', () => {
    const store = mockStore({
      cards: {
        readOnly: false,
      },
    });

    render(
      <Provider store={store}>
        <CardBody
          isEditing={false}
          descr="Bulbasaur can be seen napping in bright sunlight."
          descrChangeHandler={jest.fn()}
        />
      </Provider>
    );

    const expectedText = 'Bulbasaur can be seen napping in bright sunlight.';

    const paragraphElement = screen.getByTestId('cardBodyParagraph');
    expect(paragraphElement.textContent).toBe(expectedText);
  });

  test('check if textarea has text in card editing mode', () => {
    const store = mockStore({
      cards: {
        readOnly: false,
      },
    });

    render(
      <Provider store={store}>
        <CardBody
          isEditing={true}
          editedDescr="Bulbasaur can be seen napping in bright sunlight."
          descrChangeHandler={jest.fn()}
        />
      </Provider>
    );

    const expectedText = 'Bulbasaur can be seen napping in bright sunlight.';

    const textareaElement = screen.getByTestId('cardBodyTextarea');
    expect(textareaElement).toHaveValue(expectedText);
  });

  test('auto resizes textarea in editing mode', () => {
    render(
      <CardBody
        isEditing={true}
        editedDescr="Bulbasaur can be seen napping in bright sunlight."
        descrChangeHandler={jest.fn()}
      />
    );

    const textareaElement = screen.getByTestId('cardBodyTextarea');
    const currentHeight = textareaElement.offsetHeight + 'px';

    expect(textareaElement.style.height).toBe(currentHeight);
  });
});
