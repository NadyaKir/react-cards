import { Fragment, useEffect, useRef } from 'react';

import { Textarea, Paragraph } from './CardBody.styled';

const CardBody = (props) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (props.isEditing && textareaRef.current) {
      autoResize(textareaRef.current);
    }
  }, [props.isEditing]);

  const autoResize = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  return (
    <Fragment>
      {props.isEditing ? (
        <Textarea
          type="text"
          data-testid="cardBodyTextarea"
          ref={textareaRef}
          value={props.editedDescr}
          onChange={props.descrChangeHandler}
          onClick={(e) => autoResize(e.target)}
        ></Textarea>
      ) : (
        <Paragraph data-testid="cardBodyParagraph">{props.descr}</Paragraph>
      )}
    </Fragment>
  );
};

export default CardBody;
