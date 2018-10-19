import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './movement.reducer';
import { IMovement } from 'app/shared/model/movement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMovementProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Movement extends React.Component<IMovementProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { movementList, match } = this.props;
    return (
      <div>
        <h2 id="movement-heading">
          <Translate contentKey="ecolarMobileApp.movement.home.title">Movements</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="ecolarMobileApp.movement.home.createLabel">Create new Movement</Translate>
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
                  <Translate contentKey="ecolarMobileApp.movement.eventTime">Event Time</Translate>
                </th>
                <th>
                  <Translate contentKey="ecolarMobileApp.movement.registrationTime">Registration Time</Translate>
                </th>
                <th>
                  <Translate contentKey="ecolarMobileApp.movement.amount">Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="ecolarMobileApp.movement.location">Location</Translate>
                </th>
                <th>
                  <Translate contentKey="ecolarMobileApp.movement.eventLines">Event Lines</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {movementList.map((movement, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${movement.id}`} color="link" size="sm">
                      {movement.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={movement.eventTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={movement.registrationTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{movement.amount}</td>
                  <td>{movement.location}</td>
                  <td>
                    {movement.eventLines
                      ? movement.eventLines.map((val, j) => (
                          <span key={j}>
                            <Link to={`movement-line/${val.id}`}>{val.id}</Link>
                            {j === movement.eventLines.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${movement.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${movement.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${movement.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ movement }: IRootState) => ({
  movementList: movement.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movement);
