import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Navbar, Nav } from "core-components/navbar/NavbarComponent";
import { Container, Col, Row } from "core-components/grid/GridComponent";
import HighFiveComponent from "shared-components/high-five-components/HighFiveComponent";
import NotificationBadgeComponent from "shared-components/notification/NotificationBadgeComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";

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

function TopNavbar({ onClickLogout, count }) {
  return (
    <NavbarWrapper className="fixed-top">
      <Container fluid className="flex-column">
        <Row className="w-100 justify-content-center">
          <Col md="8" sm="12">
            <Row>
              <Col xs="8" className="text-center">
                <Navbar.Brand>Peerly</Navbar.Brand>
              </Col>
              <Col xs="2" className="text-right">
                <Nav.Link href="/" onClick={onClickLogout}>
                  logout
                </Nav.Link>
              </Col>
              <Col xs="2" className="text-right">
                <Navbar.Text>
                  <span className="d-sm-block d-none align-self-center">
                    {"This week's"}
                  </span>
                </Navbar.Text>
                <Navbar.Text>
                  <NotificationWrapper>
                    <NotificationBadgeComponent count={count} />
                  </NotificationWrapper>
                  <HighFiveIcon />
                </Navbar.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="d-sm-block d-xs-block d-md-none bg-light grey w-100">
          <ProfileComponent
            name="avinash"
            src="https://i.picsum.photos/id/2/200/200.jpg"
            size={8}
            labelClass="ml-2"
            className="mr-5"
          />
          <span className="align-self-center font-weight-bold">
            5 collected
          </span>
        </Row>
      </Container>
    </NavbarWrapper>
  );
}

TopNavbar.propTypes = {
  onClickLogout: PropTypes.func,
  count: PropTypes.number,
};

export default TopNavbar;
