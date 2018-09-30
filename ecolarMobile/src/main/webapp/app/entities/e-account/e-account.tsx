import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './e-account.reducer';
import { IEAccount } from 'app/shared/model/e-account.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEAccountProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EAccount extends React.Component<IEAccountProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { eAccountList, match } = this.props;
    return (
      <div>
        <h2 id="e-account-heading">
          <Translate contentKey="ecolarMobileApp.eAccount.home.title">E Accounts</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="ecolarMobileApp.eAccount.home.createLabel">Create new E Account</Translate>
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
                  <Translate contentKey="ecolarMobileApp.eAccount.accountCode">Account Code</Translate>
                </th>
                <th>
                  <Translate contentKey="ecolarMobileApp.eAccount.accountName">Account Name</Translate>
                </th>
                <th>
                  <Translate contentKey="ecolarMobileApp.eAccount.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="ecolarMobileApp.eAccount.category">Category</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {eAccountList.map((eAccount, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${eAccount.id}`} color="link" size="sm">
                      {eAccount.id}
                    </Button>
                  </td>
                  <td>{eAccount.accountCode}</td>
                  <td>{eAccount.accountName}</td>
                  <td>
                    <Translate contentKey={`ecolarMobileApp.AccountType.${eAccount.type}`} />
                  </td>
                  <td>{eAccount.category ? <Link to={`category/${eAccount.category.id}`}>{eAccount.category.name}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${eAccount.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${eAccount.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${eAccount.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ eAccount }: IRootState) => ({
  eAccountList: eAccount.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EAccount);
