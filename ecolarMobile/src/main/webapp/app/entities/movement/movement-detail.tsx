import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './movement.reducer';
import { IMovement } from 'app/shared/model/movement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMovementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MovementDetail extends React.Component<IMovementDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { movementEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecolarMobileApp.movement.detail.title">Movement</Translate> [<b>{movementEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="eventTime">
                <Translate contentKey="ecolarMobileApp.movement.eventTime">Event Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={movementEntity.eventTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="registrationTime">
                <Translate contentKey="ecolarMobileApp.movement.registrationTime">Registration Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={movementEntity.registrationTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="amount">
                <Translate contentKey="ecolarMobileApp.movement.amount">Amount</Translate>
              </span>
            </dt>
            <dd>{movementEntity.amount}</dd>
            <dt>
              <span id="location">
                <Translate contentKey="ecolarMobileApp.movement.location">Location</Translate>
              </span>
            </dt>
            <dd>{movementEntity.location}</dd>
            <dt>
              <Translate contentKey="ecolarMobileApp.movement.eventLines">Event Lines</Translate>
            </dt>
            <dd>
              {movementEntity.eventLines
                ? movementEntity.eventLines.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === movementEntity.eventLines.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/movement" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/movement/${movementEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ movement }: IRootState) => ({
  movementEntity: movement.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovementDetail);
