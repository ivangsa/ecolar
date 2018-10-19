import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMovementLine } from 'app/shared/model/movement-line.model';
import { getEntities as getMovementLines } from 'app/entities/movement-line/movement-line.reducer';
import { getEntity, updateEntity, createEntity, reset } from './movement.reducer';
import { IMovement } from 'app/shared/model/movement.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMovementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMovementUpdateState {
  isNew: boolean;
  idseventLines: any[];
}

export class MovementUpdate extends React.Component<IMovementUpdateProps, IMovementUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idseventLines: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getMovementLines();
  }

  saveEntity = (event, errors, values) => {
    values.eventTime = new Date(values.eventTime);
    values.registrationTime = new Date(values.registrationTime);

    if (errors.length === 0) {
      const { movementEntity } = this.props;
      const entity = {
        ...movementEntity,
        ...values,
        eventLines: mapIdList(values.eventLines)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/movement');
  };

  render() {
    const { movementEntity, movementLines, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecolarMobileApp.movement.home.createOrEditLabel">
              <Translate contentKey="ecolarMobileApp.movement.home.createOrEditLabel">Create or edit a Movement</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : movementEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="movement-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="eventTimeLabel" for="eventTime">
                    <Translate contentKey="ecolarMobileApp.movement.eventTime">Event Time</Translate>
                  </Label>
                  <AvInput
                    id="movement-eventTime"
                    type="datetime-local"
                    className="form-control"
                    name="eventTime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.movementEntity.eventTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="registrationTimeLabel" for="registrationTime">
                    <Translate contentKey="ecolarMobileApp.movement.registrationTime">Registration Time</Translate>
                  </Label>
                  <AvInput
                    id="movement-registrationTime"
                    type="datetime-local"
                    className="form-control"
                    name="registrationTime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.movementEntity.registrationTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="amount">
                    <Translate contentKey="ecolarMobileApp.movement.amount">Amount</Translate>
                  </Label>
                  <AvField id="movement-amount" type="text" name="amount" />
                </AvGroup>
                <AvGroup>
                  <Label id="locationLabel" for="location">
                    <Translate contentKey="ecolarMobileApp.movement.location">Location</Translate>
                  </Label>
                  <AvField id="movement-location" type="text" name="location" />
                </AvGroup>
                <AvGroup>
                  <Label for="movementLines">
                    <Translate contentKey="ecolarMobileApp.movement.eventLines">Event Lines</Translate>
                  </Label>
                  <AvInput
                    id="movement-eventLines"
                    type="select"
                    multiple
                    className="form-control"
                    name="eventLines"
                    value={movementEntity.eventLines && movementEntity.eventLines.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {movementLines
                      ? movementLines.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/movement" replace color="info">
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
  movementLines: storeState.movementLine.entities,
  movementEntity: storeState.movement.entity,
  loading: storeState.movement.loading,
  updating: storeState.movement.updating,
  updateSuccess: storeState.movement.updateSuccess
});

const mapDispatchToProps = {
  getMovementLines,
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
)(MovementUpdate);
