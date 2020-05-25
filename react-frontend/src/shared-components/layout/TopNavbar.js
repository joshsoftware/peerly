import React from "react";
import Container, { Navbar } from "core-components/layout/LayoutComponent";
import styled from "styled-components";

import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";
import NotificationBadgeComponent from "core-components/notification/NotificationBadgeComponent";

const NotificationWrapper = styled.div`
  position: relative;
  top: -8px;
  right: 28px;
`;

const NavbarWrapper = styled(Navbar)`
  height: 100px;
  background: var(--white) 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 10px var(--box-shadow-color);
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
              <NotificationWrapper>
                <NotificationBadgeComponent count={2} />
              </NotificationWrapper>
              <HighFiveIcon />
            </Navbar.Text>
          </div>
        </div>
      </Container>
    </NavbarWrapper>
  );
}

export default React.memo(TopNavbar);
