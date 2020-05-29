import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Badge } from "core-components/badge/BadgeComponent";

const NotificationBadge = styled(Badge)`
  border: 1px solid var(--white);
  position: absolute;
  color: var(--white);
  background-color: var(--sage);
  font-size: 60%;
`;

const NotificationBadgeComponent = ({ count, className, onClick }) => {
  return (
    <NotificationBadge
      onClick={onClick}
      className={className}
      data-testid="count-display"
      pill
    >
      {count}
    </NotificationBadge>
  );
};

NotificationBadgeComponent.propTypes = {
  count: PropTypes.number.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default NotificationBadgeComponent;
