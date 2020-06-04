import React, { Component, Fragment } from "react";
import Spinner from '../../components/UI/Spinner/Spinner';

// const withLoading = (WrappedComponent, axios, path) => {
const withLoading = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
            loading: false
        }

        componentDidMount () {
            this.addInterceptor();
        }

        componentWillUnmount () {
            this.ejectInterceptor();
        }

        // componentDidUpdate () {
        //     this.addInterceptor();
        // }

        // componentWillUpdate () {
        //     this.ejectInterceptor();
        // }

        addInterceptor = () => {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null, loading: true });
                return request;
            });
            this.responseInterceptor = axios.interceptors.response.use(response => {
                // setTimeout(() => {
                    this.setState({ loading: false });
                    // this.props.history.push(path);
                // }, 500);
                return response;
            }, error => {
                this.setState({ error: error, loading: false });
            });
        }

        ejectInterceptor = () => {
            // removing interceptors is necessary because if we wrap different components with this error handler, many instances will be created and thus leaking the memory.
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        // errorConfirmedHandler = () => {
        //     this.setState({ error: null });
        // }

        render() {
            let spinner = null;
            if(this.state.loading) {
                spinner = <Spinner />;
            }
            return (
                <Fragment>
                    {spinner}
                    <WrappedComponent {...this.props}/>
                </Fragment>
            );
        }
    };
};

export default withLoading;