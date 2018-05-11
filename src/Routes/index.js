import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage, ChatPage } from '../Components';

const RootRouter = () => {
	return(
   		<BrowserRouter>
   			<Switch>
	   			<Route exact path='/Chatroom/:name'component={ChatPage}></Route>
	   			<Route path='/' component={LoginPage}></Route>
   			</Switch>
   		</BrowserRouter>
	)
}
export default RootRouter;