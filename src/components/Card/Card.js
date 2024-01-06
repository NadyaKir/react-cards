import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardWrapper from '../UI/CardWrapper';
import withLoadingDelay from '../UI/withLoadingDelay';
import PropTypes from 'prop-types';

import store, { cardsActions } from '../../store';
// import store from '../../store';
const Card = (props) => {
  Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    descr: PropTypes.string,
    isChecked: PropTypes.bool,
    isEditing: PropTypes.bool,
    handleChange: PropTypes.func,
    onDoubleClick: PropTypes.func,
    readOnly: PropTypes.bool,
    isCheckbox: PropTypes.bool,
    hiddenCheckbox: PropTypes.bool,
  };

  const [isChecked, setIsChecked] = useState(props.isChecked);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedDescr, setEditedDescr] = useState(props.descr);

  const dispatch = useDispatch();
  const readOnly = useSelector((state) => state.cards.readOnly);

  const handleChange = () => {
    dispatch(
      cardsActions.itemChange({
        id: props.id,
        editedTitle,
        editedDescr,
        isChecked,
      })
    );
  };

  const checkboxChangeHandler = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    dispatch(
      cardsActions.itemChange({
        id: props.id,
        editedTitle,
        editedDescr,
        isChecked: newIsChecked,
      })
    );
  };

  const clickEditButtonHandler = () => {
    dispatch(
      cardsActions.setIsEditing({
        isEditing: true,
        Number: props.id,
      })
    );
    setIsChecked(false);
    console.log(store.getState());
  };

  const clickSaveButtonHandler = () => {
    dispatch(
      cardsActions.setIsEditing({
        isEditing: false,
        Number: props.id,
      })
    );
    handleChange(props.id, editedTitle, editedDescr, isChecked);
  };

  const clickCancelButtonHandler = () => {
    dispatch(
      cardsActions.setIsEditing({
        isEditing: false,
        Number: props.id,
      })
    );
    setEditedTitle(props.title);
    setEditedDescr(props.descr);
  };

  const titleChangeHandler = (event) => {
    setEditedTitle(event.target.value);
  };

  const descrChangeHandler = (event) => {
    setEditedDescr(event.target.value);
  };

  return (
    <CardWrapper>
      <div onDoubleClick={props.onDoubleClick}>
        <CardHeader
          id={props.id}
          isEditing={props.isEditing}
          editedTitle={editedTitle}
          title={props.title}
          titleChangeHandler={titleChangeHandler}
          clickEditButtonHandler={clickEditButtonHandler}
          clickSaveButtonHandler={clickSaveButtonHandler}
          clickCancelButtonHandler={clickCancelButtonHandler}
          checkboxChangeHandler={checkboxChangeHandler}
          isChecked={isChecked}
          readOnly={readOnly}
          hiddenCheckbox={props.hiddenCheckbox}
        ></CardHeader>
        <CardBody
          id={props.id}
          descr={props.descr}
          editedDescr={editedDescr}
          isEditing={props.isEditing}
          descrChangeHandler={descrChangeHandler}
        ></CardBody>
      </div>
    </CardWrapper>
  );
};

export default withLoadingDelay(Card);
