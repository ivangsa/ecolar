import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/house-hold">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.houseHold" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/user-preferences">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.userPreferences" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/account-categories">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.accountCategories" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/category">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.category" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/movement">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.movement" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/movement-line">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.movementLine" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/e-account">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.eAccount" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
