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
  width: 100%;
`;

const HighFiveIcon = styled(HighFiveComponent)`
  height: 28px;
`;

function TopNavbar({
  onClickLogout,
  count,
  profileImage,
  profileName,
  collectedHi5,
  setUserId,
  id,
}) {
  return (
    <div className="w-100">
      <NavbarWrapper>
        <Container fluid className="flex-column">
          <Row className="w-100 justify-content-center">
            <Col md="12" sm="12">
              <Row>
                <Col md="8" className="text-center">
                  <Navbar.Brand>Peerly</Navbar.Brand>
                </Col>
                <Col md="" className="text-right">
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
                <Col className="text-right">
                  <Nav.Link href="/" onClick={onClickLogout}>
                    logout
                  </Nav.Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </NavbarWrapper>
      <div className="d-md-none d-sm-block d-xs-block">
        <div className="d-flex justify-content-around bg-light grey py-2">
          <ProfileComponent
            src={profileImage}
            name={profileName}
            setUserId={setUserId}
            id={id}
            size={10}
            labelClass="ml-1"
          />
          <span className="align-self-center font-weight-bold">
            Collected {collectedHi5}
          </span>
        </div>
      </div>
    </div>
  );
}

TopNavbar.propTypes = {
  onClickLogout: PropTypes.func,
  count: PropTypes.number,
  profileImage: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  collectedHi5: PropTypes.number.isRequired,
  setUserId: PropTypes.func,
  id: PropTypes.number,
};

export default TopNavbar;
