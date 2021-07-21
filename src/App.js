import React from 'react';
import {Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import Header from './components/header/header.component';

import { auth } from './firebase/firebase.utils';
import { render } from '@testing-library/react';



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;


  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }


  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  };
  
}

export default App;







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