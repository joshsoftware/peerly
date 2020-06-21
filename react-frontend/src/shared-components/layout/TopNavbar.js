import React from "react";
import styled from "styled-components";

import { Navbar } from "core-components/navbar/NavbarComponent";
import { Container, Col, Row } from "core-components/grid/GridComponent";
import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";
import NotificationBadgeComponent from "shared-components/notification/NotificationBadgeComponent";

const NotificationWrapper = styled.div`
  position: relative;
  top: -8px;
  right: 28px;
`;

const NavbarWrapper = styled(Navbar)`
  background: var(--white) 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 10px var(--box-shadow-color);
`;

const HighFiveIcon = styled(HighFiveComponent)`
  height: 28px;
`;

function TopNavbar() {
  return (
    <NavbarWrapper className="sticky-top">
      <Container fluid>
        <Row className="w-100 justify-content-center">
          <Col md="8" sm="12">
            <Row>
              <Col xs="10" className="text-center">
                <Navbar.Brand>Peerly</Navbar.Brand>
              </Col>
              <Col xs="2" className="text-right">
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
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </NavbarWrapper>
  );
}

export default React.memo(TopNavbar);
