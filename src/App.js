import React from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'; 

import { render } from '@testing-library/react';
import { selectCurrentUser } from './redux/user/user.selectors';



class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null;

  // console.log("test1");

  componentDidMount() {

    

    console.log("this.props"+ this.props);
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log('user auth 1: ', userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          }); 
          
          //console.log(this.state);
          
          
        });

      }
        setCurrentUser(userAuth);
    });
    }


  componentWillUnmount(){
    this.unsubscribeFromAuth();
    
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          {/* <Route path='/signin' component={SignInAndSignUpPage} /> */}
          <Route
            exact
            path='/signin'
            render={() => 
              this.props.currentUser ? (
            <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
            )
            }
          />
        </Switch>
      </div>
    );
  };
  
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// })
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);


