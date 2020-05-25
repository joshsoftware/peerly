import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Badge = styled.span`
  border: 1px solid var(--white);
  position: absolute;
  padding: 1px 5px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: var(--white);
  text-align: center;
  vertical-align: baseline;
  background-color: var(--sage);
  border-radius: 10px;
`;

const NotificationBadgeComponent = ({ count, className, onClick }) => {
  return (
    <Badge onClick={onClick} className={className} data-testid="count-display">
      {count}
    </Badge>
  );
};

NotificationBadgeComponent.propTypes = {
  count: PropTypes.number.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default NotificationBadgeComponent;
