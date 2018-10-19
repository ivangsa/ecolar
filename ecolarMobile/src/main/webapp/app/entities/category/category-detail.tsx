import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './category.reducer';
import { ICategory } from 'app/shared/model/category.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICategoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CategoryDetail extends React.Component<ICategoryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { categoryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecolarMobileApp.category.detail.title">Category</Translate> [<b>{categoryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="ecolarMobileApp.category.name">Name</Translate>
              </span>
            </dt>
            <dd>{categoryEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="ecolarMobileApp.category.description">Description</Translate>
              </span>
            </dt>
            <dd>{categoryEntity.description}</dd>
            <dt>
              <span id="path">
                <Translate contentKey="ecolarMobileApp.category.path">Path</Translate>
              </span>
            </dt>
            <dd>{categoryEntity.path}</dd>
            <dt>
              <span id="parentId">
                <Translate contentKey="ecolarMobileApp.category.parentId">Parent Id</Translate>
              </span>
            </dt>
            <dd>{categoryEntity.parentId}</dd>
            <dt>
              <span id="accountType">
                <Translate contentKey="ecolarMobileApp.category.accountType">Account Type</Translate>
              </span>
            </dt>
            <dd>{categoryEntity.accountType}</dd>
            <dt>
              <Translate contentKey="ecolarMobileApp.category.parent">Parent</Translate>
            </dt>
            <dd>{categoryEntity.parent ? categoryEntity.parent.name : ''}</dd>
            <dt>
              <Translate contentKey="ecolarMobileApp.category.document">Document</Translate>
            </dt>
            <dd>{categoryEntity.document ? categoryEntity.document.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/category" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/category/${categoryEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ category }: IRootState) => ({
  categoryEntity: category.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDetail);
