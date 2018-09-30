import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IHouseHold } from 'app/shared/model/house-hold.model';
import { getEntities as getHouseHolds } from 'app/entities/house-hold/house-hold.reducer';
import { getEntity, updateEntity, createEntity, reset } from './accounts-document.reducer';
import { IAccountsDocument } from 'app/shared/model/accounts-document.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAccountsDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAccountsDocumentUpdateState {
  isNew: boolean;
  householdId: string;
}

export class AccountsDocumentUpdate extends React.Component<IAccountsDocumentUpdateProps, IAccountsDocumentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      householdId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getHouseHolds();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { accountsDocumentEntity } = this.props;
      const entity = {
        ...accountsDocumentEntity,
        ...values
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
    this.props.history.push('/entity/accounts-document');
  };

  render() {
    const { accountsDocumentEntity, houseHolds, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecolarMobileApp.accountsDocument.home.createOrEditLabel">
              <Translate contentKey="ecolarMobileApp.accountsDocument.home.createOrEditLabel">Create or edit a AccountsDocument</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : accountsDocumentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="accounts-document-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <Button tag={Link} id="cancel-save" to="/entity/accounts-document" replace color="info">
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
  houseHolds: storeState.houseHold.entities,
  accountsDocumentEntity: storeState.accountsDocument.entity,
  loading: storeState.accountsDocument.loading,
  updating: storeState.accountsDocument.updating
});

const mapDispatchToProps = {
  getHouseHolds,
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
)(AccountsDocumentUpdate);
