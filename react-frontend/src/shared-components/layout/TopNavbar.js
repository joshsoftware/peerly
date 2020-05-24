import React from "react";
import { Navbar, Container } from "react-bootstrap";
import styled from "styled-components";

import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";
import NotificationBadgeComponent from "core-components/notification/NotificationBadgeComponent";

const NavbarWrapper = styled(Navbar)`
  height: 100px;
  background: var(--white) 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 10px #1b1c201a;
  opacity: 1;
`;

const BrandText = styled(Navbar.Brand)`
  position: absolute;
  left: calc(50% - 27px);
  right: 50%;
`;

const HighFiveIcon = styled(HighFiveComponent)`
  height: 28px;
`;

function TopNavbar() {
  return (
    <NavbarWrapper>
      <Container>
        <div className="w-100">
          <BrandText data-testid="brandHeader">Peerly</BrandText>
          <div className="text-right">
            <Navbar.Text>
              <span className="d-sm-block d-none align-self-center">
                {"This week's"}
              </span>
            </Navbar.Text>
            <Navbar.Text>
              <NotificationBadgeComponent count={2} />
              <HighFiveIcon />
            </Navbar.Text>
          </div>
        </div>
      </Container>
    </NavbarWrapper>
  );
}

export default React.memo(TopNavbar);
