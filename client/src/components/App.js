import React from 'react';
import { Router, Route, Switch } from 'react-router-dom' 
import { connect } from 'react-redux'
import StreamList from './streams/StreamList'
import StreamCreate from './streams/StreamCreate'
import StreamEdit from './streams/StreamEdit'
import StreamShow from './streams/StreamShow'
import StreamDelete from './streams/StreamDelete'
import StreamFind from './streams/StreamFind'
import Header from './Header/Header'
import history from '../history'
import styles from './styles.module.css'

const App = () => {
    return (
        <div className="bodyWrapper">
        <Router history={history}>
            <div>
                <Header />
                <Switch>
                    <div className={styles.mainContentWrapper}>
                        <Route path="/" exact component={StreamList} />
                        <Route path="/streams/new" exact component={StreamCreate} />
                        <Route path="/streams/edit/:id" exact component={StreamEdit} />
                        <Route path="/streams/delete/:id" exact component={StreamDelete} />
                        <Route path="/streams/show/:id" exact component={StreamShow} />
                        <Route path="/streams/search/:term" exact component={StreamFind} />
                    </div>
                </Switch>
            </div>
        </Router>
        </div>
    )
}

export default connect()(App);