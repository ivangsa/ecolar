import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEAccount } from 'app/shared/model/e-account.model';
import { getEntities as getEAccounts } from 'app/entities/e-account/e-account.reducer';
import { getEntity, updateEntity, createEntity, reset } from './movement-line.reducer';
import { IMovementLine } from 'app/shared/model/movement-line.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMovementLineUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMovementLineUpdateState {
  isNew: boolean;
  accountId: string;
}

export class MovementLineUpdate extends React.Component<IMovementLineUpdateProps, IMovementLineUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      accountId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getEAccounts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { movementLineEntity } = this.props;
      const entity = {
        ...movementLineEntity,
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
    this.props.history.push('/entity/movement-line');
  };

  render() {
    const { movementLineEntity, eAccounts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecolarMobileApp.movementLine.home.createOrEditLabel">
              <Translate contentKey="ecolarMobileApp.movementLine.home.createOrEditLabel">Create or edit a MovementLine</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : movementLineEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="movement-line-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="amountLabel" for="amount">
                    <Translate contentKey="ecolarMobileApp.movementLine.amount">Amount</Translate>
                  </Label>
                  <AvField id="movement-line-amount" type="text" name="amount" />
                </AvGroup>
                <AvGroup>
                  <Label id="eventTypeLabel">
                    <Translate contentKey="ecolarMobileApp.movementLine.eventType">Event Type</Translate>
                  </Label>
                  <AvInput
                    id="movement-line-eventType"
                    type="select"
                    className="form-control"
                    name="eventType"
                    value={(!isNew && movementLineEntity.eventType) || 'CREDIT'}
                  >
                    <option value="CREDIT">
                      <Translate contentKey="ecolarMobileApp.LineType.CREDIT" />
                    </option>
                    <option value="DEBIT">
                      <Translate contentKey="ecolarMobileApp.LineType.DEBIT" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="account.accountName">
                    <Translate contentKey="ecolarMobileApp.movementLine.account">Account</Translate>
                  </Label>
                  <AvInput id="movement-line-account" type="select" className="form-control" name="account.id">
                    <option value="" key="0" />
                    {eAccounts
                      ? eAccounts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.accountName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/movement-line" replace color="info">
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
  eAccounts: storeState.eAccount.entities,
  movementLineEntity: storeState.movementLine.entity,
  loading: storeState.movementLine.loading,
  updating: storeState.movementLine.updating
});

const mapDispatchToProps = {
  getEAccounts,
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
)(MovementLineUpdate);
