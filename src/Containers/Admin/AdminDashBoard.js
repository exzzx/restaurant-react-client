import React, {Component} from 'react';
import UserService from '../../Services/UserServiceClient';
import {connect} from "react-redux";
import * as actions from "../../Actions/UserAction";
import {Route, Link} from "react-router-dom";
import AdminDashBoardOptionDetail from "./AdminDashBoardOptionDetail";
import AdminDashBoardList from "../../Components/AdminDashboard/AdminDashBoardList";
import logo from '../../Images/nueats.png';

class AdminDashBoard extends Component {
    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        this.props.findUser();
    }

    logOut() {
        this.props.logOut();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container-fluid">
                <dl className="row">
                    <dt className="col-sm-3">
                        <Link to ={`/`}>
                            <img src={logo} style={{height:"70px", width:"300px"}}/>
                        </Link>
                    </dt>
                    <dd className="col-sm-9">
                        <div className="float-right">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <h4>
                                        {this.props.currentUser.username}
                                    </h4>
                                </li>
                                <li className="list-inline-item">
                                    <h5>|</h5>
                                </li>
                                <li className="list-inline-item">
                                    <a onClick={this.logOut}
                                            className="btn btn-danger">
                                        Log Out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </dd>
                </dl>
                <h2>Admin's DashBoard</h2>
                <br/>
                <div className="row">
                    <div className="col-sm-2">
                        <AdminDashBoardList username={this.props.currentUser.username}/>
                    </div>
                    <div className="col-sm-10">
                        <Route path="/dashboard/admin/:username/:option"
                               render={(props) =>
                                   <AdminDashBoardOptionDetail {...props}/>}>
                        </Route>
                    </div>
                </div>


            </div>

        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        userType: state.users.userType,
        currentUser: state.users.currentUser
    }
};

const dispatcherToPropertyMapper = (dispatch) => {

    return {
        findUser: () => actions.findUser(dispatch),
        logOut: () => actions.logOut(dispatch)
    }
};

export const AdminDashBoardContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)(AdminDashBoard);