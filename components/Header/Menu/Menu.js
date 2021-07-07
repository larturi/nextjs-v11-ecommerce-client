/* eslint-disable @next/next/link-passhref */

import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";

const MenuHeader = () => {
  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuOptionsUser />
          </Grid.Column>
        </Grid>
      </Container>
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

const MenuOptionsUser = () => {
  return (
    <Menu>
      <Menu.Item>
        <Icon name="user outline" />
        Mi Cuenta
      </Menu.Item>
    </Menu>
  );
};

export default MenuHeader;
