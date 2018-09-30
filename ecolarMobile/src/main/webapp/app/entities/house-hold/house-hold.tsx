import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './house-hold.reducer';
import { IHouseHold } from 'app/shared/model/house-hold.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHouseHoldProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class HouseHold extends React.Component<IHouseHoldProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { houseHoldList, match } = this.props;
    return (
      <div>
        <h2 id="house-hold-heading">
          <Translate contentKey="ecolarMobileApp.houseHold.home.title">House Holds</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="ecolarMobileApp.houseHold.home.createLabel">Create new House Hold</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ecolarMobileApp.houseHold.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="ecolarMobileApp.houseHold.accountsDocument">Accounts Document</Translate>
                </th>
                <th>
                  <Translate contentKey="ecolarMobileApp.houseHold.members">Members</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {houseHoldList.map((houseHold, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${houseHold.id}`} color="link" size="sm">
                      {houseHold.id}
                    </Button>
                  </td>
                  <td>{houseHold.name}</td>
                  <td>
                    {houseHold.accountsDocument ? (
                      <Link to={`accounts-document/${houseHold.accountsDocument.id}`}>{houseHold.accountsDocument.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {houseHold.members
                      ? houseHold.members.map((val, j) => (
                          <span key={j}>
                            {val.login}
                            {j === houseHold.members.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${houseHold.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${houseHold.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${houseHold.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ houseHold }: IRootState) => ({
  houseHoldList: houseHold.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseHold);
