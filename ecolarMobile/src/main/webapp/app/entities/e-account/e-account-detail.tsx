import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './e-account.reducer';
import { IEAccount } from 'app/shared/model/e-account.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEAccountDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EAccountDetail extends React.Component<IEAccountDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { eAccountEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecolarMobileApp.eAccount.detail.title">EAccount</Translate> [<b>{eAccountEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="accountCode">
                <Translate contentKey="ecolarMobileApp.eAccount.accountCode">Account Code</Translate>
              </span>
            </dt>
            <dd>{eAccountEntity.accountCode}</dd>
            <dt>
              <span id="accountName">
                <Translate contentKey="ecolarMobileApp.eAccount.accountName">Account Name</Translate>
              </span>
            </dt>
            <dd>{eAccountEntity.accountName}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="ecolarMobileApp.eAccount.type">Type</Translate>
              </span>
            </dt>
            <dd>{eAccountEntity.type}</dd>
            <dt>
              <Translate contentKey="ecolarMobileApp.eAccount.category">Category</Translate>
            </dt>
            <dd>{eAccountEntity.category ? eAccountEntity.category.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/e-account" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/e-account/${eAccountEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ eAccount }: IRootState) => ({
  eAccountEntity: eAccount.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EAccountDetail);
