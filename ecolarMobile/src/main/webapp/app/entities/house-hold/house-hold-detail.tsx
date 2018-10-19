import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './house-hold.reducer';
import { IHouseHold } from 'app/shared/model/house-hold.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHouseHoldDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HouseHoldDetail extends React.Component<IHouseHoldDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { houseHoldEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecolarMobileApp.houseHold.detail.title">HouseHold</Translate> [<b>{houseHoldEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="ecolarMobileApp.houseHold.name">Name</Translate>
              </span>
            </dt>
            <dd>{houseHoldEntity.name}</dd>
            <dt>
              <Translate contentKey="ecolarMobileApp.houseHold.accountCategories">Account Categories</Translate>
            </dt>
            <dd>{houseHoldEntity.accountCategories ? houseHoldEntity.accountCategories.id : ''}</dd>
            <dt>
              <Translate contentKey="ecolarMobileApp.houseHold.members">Members</Translate>
            </dt>
            <dd>
              {houseHoldEntity.members
                ? houseHoldEntity.members.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.login}</a>
                      {i === houseHoldEntity.members.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}{' '}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/house-hold" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/house-hold/${houseHoldEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ houseHold }: IRootState) => ({
  houseHoldEntity: houseHold.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseHoldDetail);
