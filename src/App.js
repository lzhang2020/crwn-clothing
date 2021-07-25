import React from 'react';
import {Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'; 

import { render } from '@testing-library/react';



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
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  };
  
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);







// import React from 'react';
// import { Route, Link } from 'react-router-dom';

// import './App.css';

// const HomePage = (props) => {
//   console.log(props);
//   return (
//     <div>
//       {/* <Link to='/topics'>Topics</Link> */}
//       <button onClick={() => props.history.push('/topics')}>Topics </button>

//       <h1>HOME PAGE</h1>
//     </div>
//   );
// };

// const TopicsList = props => {
//   return (
//     <div>
//       <h1>TOPIC LIST PAGE</h1>
//       <Link to={`${props.match.url}/13`}>TO TOPIC 13</Link>
//       <Link to={`${props.match.url}/17`}>TO TOPIC 17</Link>
//       <Link to={`${props.match.url}/21`}>TO TOPIC 21</Link>
//     </div>
//   );
// };

// const TopicDetail = props => {
//   console.log(props);
//   return (
//     <div>
//       <h1>TOPIC DETAIL PAGE: {props.match.params.topicId}</h1>
//     </div>
//   )
// }

// function App() {
//   return (
//     <div>
//       <Route exact path='/' component={HomePage} />
//       <Route exact path='/topics' component={TopicsList} />
//       <Route path='/topics/:topicId' component={TopicDetail} />
//     </div>
//   );
// }

// export default App;