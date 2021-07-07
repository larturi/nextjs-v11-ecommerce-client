/* eslint-disable @next/next/link-passhref */

import { useState } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";

import BasicModal from "../../Modal/BasicModal/BasicModal";

const MenuHeader = () => {
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => setShowModal(true);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuOptionsUser onShowModal={onShowModal} />
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title="Crear tu cuenta"
        size="small"
      >
        <h3>Modal Content</h3>
      </BasicModal>
    </div>
  );
};

const MenuPlatforms = () => {
  return (
    <Menu>
      <Link href="/ps5">
        <Menu.Item asa="a">PS5</Menu.Item>
      </Link>
      <Link href="/xbox">
        <Menu.Item asa="a">Xbox</Menu.Item>
      </Link>
      <Link href="/nintendo">
        <Menu.Item asa="a">Nintendo</Menu.Item>
      </Link>
    </Menu>
  );
};

const MenuOptionsUser = (props) => {
  const { onShowModal } = props;
  return (
    <Menu>
      <Menu.Item onClick={onShowModal}>
        <Icon name="user outline" />
        Mi Cuenta
      </Menu.Item>
    </Menu>
  );
};

export default MenuHeader;
