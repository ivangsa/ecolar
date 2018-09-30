import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAccountsDocument } from 'app/shared/model/accounts-document.model';
import { getEntities as getAccountsDocuments } from 'app/entities/accounts-document/accounts-document.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './house-hold.reducer';
import { IHouseHold } from 'app/shared/model/house-hold.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHouseHoldUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IHouseHoldUpdateState {
  isNew: boolean;
  idsmembers: any[];
  accountsDocumentId: string;
}

export class HouseHoldUpdate extends React.Component<IHouseHoldUpdateProps, IHouseHoldUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsmembers: [],
      accountsDocumentId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getAccountsDocuments();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { houseHoldEntity } = this.props;
      const entity = {
        ...houseHoldEntity,
        ...values,
        members: mapIdList(values.members)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/house-hold');
  };

  render() {
    const { houseHoldEntity, accountsDocuments, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecolarMobileApp.houseHold.home.createOrEditLabel">
              <Translate contentKey="ecolarMobileApp.houseHold.home.createOrEditLabel">Create or edit a HouseHold</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : houseHoldEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="house-hold-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="ecolarMobileApp.houseHold.name">Name</Translate>
                  </Label>
                  <AvField id="house-hold-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label for="accountsDocument.id">
                    <Translate contentKey="ecolarMobileApp.houseHold.accountsDocument">Accounts Document</Translate>
                  </Label>
                  <AvInput id="house-hold-accountsDocument" type="select" className="form-control" name="accountsDocument.id">
                    <option value="" key="0" />
                    {accountsDocuments
                      ? accountsDocuments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="users">
                    <Translate contentKey="ecolarMobileApp.houseHold.members">Members</Translate>
                  </Label>
                  <AvInput
                    id="house-hold-members"
                    type="select"
                    multiple
                    className="form-control"
                    name="members"
                    value={houseHoldEntity.members && houseHoldEntity.members.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/house-hold" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  accountsDocuments: storeState.accountsDocument.entities,
  users: storeState.userManagement.users,
  houseHoldEntity: storeState.houseHold.entity,
  loading: storeState.houseHold.loading,
  updating: storeState.houseHold.updating
});

const mapDispatchToProps = {
  getAccountsDocuments,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseHoldUpdate);
