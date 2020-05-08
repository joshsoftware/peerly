import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

import Hi5CountSharedComponent from "sharedComponent/Hi5CountSharedComponent";
const CreateRecognitionCardBody = (props) => {
  const {
    buttonclassName,
    type,
    value,
    variant,
    size,
    ButtonIcon,
    hi5CountComponent,
  } = props;
  const onClick = () => {}; //eslint-disable-line no-empty-function

  return (
    <>
      <Button
        className={buttonclassName}
        type={type}
        value={value}
        variant={variant}
        size={size}
        onClick={onClick}
        style={{ borderRadius: "25rem" }}
      >
        <ButtonIcon />
      </Button>

      <Hi5CountSharedComponent
        hi5Count={hi5CountComponent.hi5Count}
        availabilityStatus={hi5CountComponent.availabilityStatus}
        availabilityStatusClassName={
          hi5CountComponent.availabilityStatusClassName
        }
        hi5CountClassName={hi5CountComponent.hi5CountClassName}
        src={hi5CountComponent.src}
        alt={hi5CountComponent.alt}
        height={hi5CountComponent.height}
        width={hi5CountComponent.width}
        imgClassName={hi5CountComponent.imgClassName}
      />
    </>
  );
};

CreateRecognitionCardBody.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  buttonclassName: PropTypes.string,
  ButtonIcon: PropTypes.any.isRequired,
  value: PropTypes.string.isRequired,
  hi5CountComponent: PropTypes.shape({
    availabilityStatus: PropTypes.string.isRequired,
    availabilityStatusClassName: PropTypes.string,
    src: PropTypes.string.isRequired,
    imgClassName: PropTypes.string,
    alt: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    hi5CountClassName: PropTypes.string,
    hi5Count: PropTypes.string.isRequired,
  }),
};

export default CreateRecognitionCardBody;
