import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const NotificationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Notification = styled.span`
  border: 1px solid white;
  display: inline-block;
  position: absolute;
  min-width: 10px;
  padding: 1px 5px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: var(--white);
  text-align: center;
  vertical-align: baseline;
  background-color: var(--sage);
  border-radius: 10px;
  top: -5px;
  right: 15px;
`;

const NotificationBadgeComponent = ({ count }) => {
  return (
    <NotificationWrapper>
      <Notification data-testid="count-display">{count}</Notification>
    </NotificationWrapper>
  );
};

NotificationBadgeComponent.propTypes = {
  count: PropTypes.number.isRequired,
};

export default NotificationBadgeComponent;
