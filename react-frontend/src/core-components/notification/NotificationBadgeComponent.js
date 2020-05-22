import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const NotificationWrapper = styled.div`
  position: relative;
`;

const Badge = styled.span`
  border: 1px solid white;
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
  top: ${(props) => props.top && props.top};
  right: ${(props) => props.right && props.right};
  left: ${(props) => props.left && props.left};
  bottom: ${(props) => props.bottom && props.bottom};
`;

const NotificationBadgeComponent = ({ count, styles }) => {
  return (
    <NotificationWrapper>
      <Badge data-testid="count-display" {...styles}>
        {count}
      </Badge>
    </NotificationWrapper>
  );
};

NotificationBadgeComponent.propTypes = {
  count: PropTypes.number.isRequired,
  styles: PropTypes.object,
};

NotificationBadgeComponent.defaultProps = {
  styles: { top: "-5px", right: "15px" },
};

export default NotificationBadgeComponent;
