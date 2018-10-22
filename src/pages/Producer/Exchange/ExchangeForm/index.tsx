import React, { Component } from 'react';
// import { Translate } from 'react-localize-redux';
import './index.css';
import ReactSVG from 'react-svg';
import trendIcon from './trend.svg';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IUser } from '../../../../reducers/userReducer';
import { IStoreState } from '../../../../types';
import { dateTimeFormat } from '../../../../utils/timeFormat';
import { getExchangeForm } from '../../../../actions/userActions';
interface IStateProps {
  exchangeForm: IUser['exchangeForm'];
}

interface IDispatchProps {
  getExchangeForm: typeof getExchangeForm;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  exchangeForm: state.user.exchangeForm,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getExchangeForm: () => dispatch(getExchangeForm()),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps & IDispatchProps & RouteComponentProps;
  }

  public componentDidMount() {
    this.injected.getExchangeForm();
  }
  public render() {
    return (
      <div styleName="container">
        <div styleName="history">
          <h2>电力交易</h2>

          <ReactSVG src={trendIcon} onClick={this.injected.history.goBack} />
        </div>
        {this.injected.exchangeForm.map((item, index) => (
          <div styleName="card-deal" key={index}>
            <div styleName="card-top">
              <ul>
                <li>
                  <span>发电量</span>
                  <br />
                  <span>{item.count}</span>
                </li>
                <li>
                  <span>电价(元/度)</span>
                  <br />
                  <span>{item.price}</span>
                </li>
              </ul>
            </div>
            <p>用电时间段 {dateTimeFormat(item.time)} </p>
          </div>
        ))}
      </div>
    );
  }
}