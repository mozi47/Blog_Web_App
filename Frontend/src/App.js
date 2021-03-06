import React from 'react'
import "./index.css"
import useStyles from './Styles';
import { Route, Switch } from "react-router-dom";
import { Container } from '@material-ui/core';
import Navbar from './component/Navbar';
import Home from "./component/Home";
import Auth from "./component/Auth";
import Contact from "./component/Contact";

const App = () => {
    const classes = useStyles()

    return (
    <Container maxWidth="lg">
      <Navbar/>
      <Switch>
        <Route path="/contact" component={Contact}/>
        <Route path="/posts/:page" component={Home}/>
        <Route path="/search/:keyword" component={Home}/>
        <Route path="/auth" component={Auth}/>
        <Route exact path="/" component={Home}/>
      </Switch>
    </Container>
    )
}

export default App
