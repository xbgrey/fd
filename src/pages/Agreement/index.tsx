import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Button, Icon, NavBar } from 'antd-mobile';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';

import { IStoreState } from '../../types';
import { IUser } from '../../reducers/userReducer';
import { updateRole } from '../../actions/userActions';

import './index.css';

interface IState {
  agreement: string;
}
interface IStateProps {
  role: IUser['role'];
  lang: IUser['config']['lang'];
}
interface IDispatchProps {
  updateRole: (role: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateRole: (role: string) => dispatch(updateRole({ role })),
});

const mapStateToProps = (state: IStoreState) => ({
  role: state.user.role,
  lang: state.user.config.lang,
});

function getAgreement(code: string): Promise<{}> {
  return import('./' + code + '.json');
}

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component<{}, IState> {
  public state = { agreement: '' };

  get injected() {
    return this.props as IStateProps & IDispatchProps & RouteComponentProps;
  }

  public componentDidMount() {
    const lang = this.injected.lang;
    const side = this.injected.location.state.side;

    getAgreement(lang).then(data => {
      this.setState({ agreement: data[side] });
    });
  }

  public clickHandle = () => {
    this.injected.updateRole(this.injected.role);
  };

  public render() {
    return (
      <div styleName="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.injected.history.goBack}
        >
          <Translate id="login.agreement" />
        </NavBar>
        <div styleName="wrapper">
          <div
            styleName="agreement"
            dangerouslySetInnerHTML={{ __html: this.state.agreement }}
          />
          <Button type="primary" onClick={this.clickHandle}>
            <Translate id="login.agree" />
          </Button>
        </div>
      </div>
    );
  }
}