import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IAccountsDocument } from 'app/shared/model/accounts-document.model';
import { getEntities as getAccountsDocuments } from 'app/entities/accounts-document/accounts-document.reducer';
import { getEntity, updateEntity, createEntity, reset } from './category.reducer';
import { ICategory } from 'app/shared/model/category.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICategoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICategoryUpdateState {
  isNew: boolean;
  parentId: string;
  categoriesId: string;
  documentId: string;
}

export class CategoryUpdate extends React.Component<ICategoryUpdateProps, ICategoryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      parentId: '0',
      categoriesId: '0',
      documentId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCategories();
    this.props.getAccountsDocuments();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { categoryEntity } = this.props;
      const entity = {
        ...categoryEntity,
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
    this.props.history.push('/entity/category');
  };

  render() {
    const { categoryEntity, categories, accountsDocuments, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecolarMobileApp.category.home.createOrEditLabel">
              <Translate contentKey="ecolarMobileApp.category.home.createOrEditLabel">Create or edit a Category</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : categoryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="category-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="ecolarMobileApp.category.name">Name</Translate>
                  </Label>
                  <AvField id="category-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="ecolarMobileApp.category.description">Description</Translate>
                  </Label>
                  <AvField id="category-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="pathLabel" for="path">
                    <Translate contentKey="ecolarMobileApp.category.path">Path</Translate>
                  </Label>
                  <AvField id="category-path" type="text" name="path" />
                </AvGroup>
                <AvGroup>
                  <Label id="parentIdLabel" for="parentId">
                    <Translate contentKey="ecolarMobileApp.category.parentId">Parent Id</Translate>
                  </Label>
                  <AvField id="category-parentId" type="text" name="parentId" />
                </AvGroup>
                <AvGroup>
                  <Label id="accountTypeLabel">
                    <Translate contentKey="ecolarMobileApp.category.accountType">Account Type</Translate>
                  </Label>
                  <AvInput
                    id="category-accountType"
                    type="select"
                    className="form-control"
                    name="accountType"
                    value={(!isNew && categoryEntity.accountType) || 'ASSETS'}
                  >
                    <option value="ASSETS">
                      <Translate contentKey="ecolarMobileApp.AccountType.ASSETS" />
                    </option>
                    <option value="LIABILITIES">
                      <Translate contentKey="ecolarMobileApp.AccountType.LIABILITIES" />
                    </option>
                    <option value="REVENUE">
                      <Translate contentKey="ecolarMobileApp.AccountType.REVENUE" />
                    </option>
                    <option value="EXPENSE">
                      <Translate contentKey="ecolarMobileApp.AccountType.EXPENSE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="parent.name">
                    <Translate contentKey="ecolarMobileApp.category.parent">Parent</Translate>
                  </Label>
                  <AvInput id="category-parent" type="select" className="form-control" name="parent.id">
                    <option value="" key="0" />
                    {categories
                      ? categories.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="document.id">
                    <Translate contentKey="ecolarMobileApp.category.document">Document</Translate>
                  </Label>
                  <AvInput id="category-document" type="select" className="form-control" name="document.id">
                    <option value="" key="0" />
                    {accountsDocuments
                      ? accountsDocuments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/category" replace color="info">
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
  categories: storeState.category.entities,
  accountsDocuments: storeState.accountsDocument.entities,
  categoryEntity: storeState.category.entity,
  loading: storeState.category.loading,
  updating: storeState.category.updating
});

const mapDispatchToProps = {
  getCategories,
  getAccountsDocuments,
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
)(CategoryUpdate);
