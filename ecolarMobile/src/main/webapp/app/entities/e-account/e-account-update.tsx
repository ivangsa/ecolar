import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { getEntity, updateEntity, createEntity, reset } from './e-account.reducer';
import { IEAccount } from 'app/shared/model/e-account.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEAccountUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEAccountUpdateState {
  isNew: boolean;
  categoryId: string;
}

export class EAccountUpdate extends React.Component<IEAccountUpdateProps, IEAccountUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: '0',
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

    this.props.getCategories();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { eAccountEntity } = this.props;
      const entity = {
        ...eAccountEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/e-account');
  };

  render() {
    const { eAccountEntity, categories, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecolarMobileApp.eAccount.home.createOrEditLabel">
              <Translate contentKey="ecolarMobileApp.eAccount.home.createOrEditLabel">Create or edit a EAccount</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : eAccountEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="e-account-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="accountCodeLabel" for="accountCode">
                    <Translate contentKey="ecolarMobileApp.eAccount.accountCode">Account Code</Translate>
                  </Label>
                  <AvField id="e-account-accountCode" type="text" name="accountCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="accountNameLabel" for="accountName">
                    <Translate contentKey="ecolarMobileApp.eAccount.accountName">Account Name</Translate>
                  </Label>
                  <AvField id="e-account-accountName" type="text" name="accountName" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel">
                    <Translate contentKey="ecolarMobileApp.eAccount.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="e-account-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && eAccountEntity.type) || 'ASSETS'}
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
                  <Label for="category.name">
                    <Translate contentKey="ecolarMobileApp.eAccount.category">Category</Translate>
                  </Label>
                  <AvInput id="e-account-category" type="select" className="form-control" name="category.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/e-account" replace color="info">
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
  eAccountEntity: storeState.eAccount.entity,
  loading: storeState.eAccount.loading,
  updating: storeState.eAccount.updating,
  updateSuccess: storeState.eAccount.updateSuccess
});

const mapDispatchToProps = {
  getCategories,
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
)(EAccountUpdate);
