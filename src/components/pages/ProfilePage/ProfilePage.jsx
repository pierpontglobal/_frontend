import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import AccountPanel from '../../AccountPanel/AccountPanel';
import { ApiServer } from '../../../Defaults';
import DealerCreator from './DealerCreator/DealerCreator';
import SettingSide from './SettingSide/SettingSide';
import SubscriptionSide from './SubscriptionSide/SubscriptionSide';
import AlertNotification from './Components/AlertNotification';
import PurchaseSide from './PurchaseSide/PurchaseSide';
import PendingSide from './PendingSide/PendingSide';
import FinancialSide from './FinancialSide/FinancialSide';
import TransactionsSide from './TransactionsSide/TransactionsSide';
import NotificationTypes from '../../../constants/NotificationTypes';
import IssueTypes from '../../../constants/IssueTypes';
import styled from 'styled-components';
import './styles.css';

const dealerExample = {
  image: null,
  name: 'Dealer name',
  address: 'Address...',
  email: 'dealer@example.com',
  number: '+1 (809) 123-5555',
};

const Wrapper = styled.div`
  background-color: #dedede;
  width: 100%;
  height: 100%;
`;

const AccountPanelWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 300px;
  left: 0;
  top: 0;
  padding-top: 55px;
  display: none;
  @media only screen and (min-width: 768px) {
    display: inherit;
  }
`;

const RouterWrapper = styled.div`
  margin-bottom: 50px;
  @media only screen and (min-width: 768px) {
    margin-left: 300px;
  }
`;
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasDealer: true,
      hasPaymentMethod: true,
      notifications: [],
    };

    this.getDealer = this.getDealer.bind(this);
    this.openDealerCreator = this.openDealerCreator.bind(this);
    this.getDealer();
    this.getPaymentMethod();
  }

  componentDidMount() {
    this.checkNotifications();
  }

  async getDealer() {
    const responseDealer = await axios.get(`${ApiServer}/api/v1/user/dealers`);
    const responseUser = await axios.get(`${ApiServer}/api/v1/user`);

    if (responseDealer.data === null) {
      this.openDealerCreator();
    } else {
      this.setState({
        dealer: {
          name: responseDealer.data.name,
          address: responseDealer.data.address1,
          number: responseDealer.data.phone_number,
          email: responseUser.data.email,
        },
      }, () => {
        const { dealer } = this.state;
        if (!!this.props.setDealer) {
          this.props.setDealer(dealer);
        }
      });
    }
  }

  async getPaymentMethod() {
    try {
      await axios.get(`${ApiServer}/api/v1/user/subscriptions`);
    } catch (e) {
      this.setState({
        hasPaymentMethod: false,
      });
    }
  }

  openDealerCreator() {
    this.setState({
      hasDealer: false,
    });
  }

  sendNotification = (notificationDto) => {
    axios.post(`${ApiServer}/api/v1/notification`, {...notificationDto});
  }

  checkNotifications = async () => {

    let subscriptions = (await axios.get(`${ApiServer}/api/v1/user/subscriptions`)).data;
    let cards = (await axios.get(`${ApiServer}/api/v1/user/cards/default`)).data;

    let notificationDto = {
      title: 'Account incomplete',
      message: `Please, add a subscription to this account. You won't be able to place bids until its complete.`,
      payload: subscriptions,
      type: NotificationTypes.alert,
      issue_id: undefined
    }

    if (subscriptions == undefined) {
      this.sendNotification(notificationDto);
    } else if (!!subscriptions && !subscriptions.active) {
      this.sendNotification(notificationDto);
    }

    if (cards == undefined) {
      notificationDto.payload = cards;
      notificationDto.message = `Please, add your card information to your account. You won't be able to process any payment before its complete.`;
      notificationDto.issue_id = IssueTypes.CARD_INFORMATION_MISSING;
      this.sendNotification(notificationDto);
    }
  }

  render() {
    const {
      notifications,
      hasDealer,
      dealer,
      hasPaymentMethod,
    } = this.state;
    const { cookies } = this.props;

    return (
      <Wrapper>
        <DealerCreator show={!hasDealer || !hasPaymentMethod} hasDealer={hasDealer} />
        <AccountPanelWrapper>
          <AccountPanel dealer={dealer || dealerExample} />
        </AccountPanelWrapper>
        <RouterWrapper>
          <Router>
            <Switch>
              <Route exact path="/user" render={() => (<SettingSide cookies={cookies} />)} />
              <Route exact path="/user/purchase" render={() => (<PurchaseSide cookies={cookies} />)} />
              <Route exact path="/user/pending" render={() => (<PendingSide cookies={cookies} />)} />
              <Route exact path="/user/financial" render={() => (<FinancialSide cookies={cookies} />)} />
              <Route
                exact
                path="/user/subscription"
                render={() => (
                  <SubscriptionSide cookies={cookies} />
                )}
              />
              <Route exact path="/user/transactions" render={() => (<TransactionsSide cookies={cookies} />)} />
            </Switch>
          </Router>
        </RouterWrapper>
      </Wrapper>
    );
  }
}

ProfilePage.propTypes = {
  cookies: PropTypes.object,
};

ProfilePage.defaultProps = {
  cookies: {},
};

export default ProfilePage;
