import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './movement-line.reducer';
import { IMovementLine } from 'app/shared/model/movement-line.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMovementLineDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MovementLineDetail extends React.Component<IMovementLineDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { movementLineEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecolarMobileApp.movementLine.detail.title">MovementLine</Translate> [<b>{movementLineEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="amount">
                <Translate contentKey="ecolarMobileApp.movementLine.amount">Amount</Translate>
              </span>
            </dt>
            <dd>{movementLineEntity.amount}</dd>
            <dt>
              <span id="eventType">
                <Translate contentKey="ecolarMobileApp.movementLine.eventType">Event Type</Translate>
              </span>
            </dt>
            <dd>{movementLineEntity.eventType}</dd>
            <dt>
              <Translate contentKey="ecolarMobileApp.movementLine.account">Account</Translate>
            </dt>
            <dd>{movementLineEntity.account ? movementLineEntity.account.accountName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/movement-line" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/movement-line/${movementLineEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ movementLine }: IRootState) => ({
  movementLineEntity: movementLine.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovementLineDetail);
