/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-09 11:27:38
 * @version $Id$
 */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { debounce } from 'underscore';
import './scrollLoaderStyle'

export default class ScrollLoader extends Component {

    componentDidMount() {
        this.scrollListener = debounce(this.fetchInView.bind(this), 200);
        window.addEventListener('scroll', this.scrollListener);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollListener);
    }

    fetchInView() {
        const { loading, onFetch } = this.props;
        const { top } = findDOMNode(this).getBoundingClientRect();
        const OFFSET = 50; // ensure the element is at least 50 pixels in view

        if (!loading && top < window.innerHeight + OFFSET && typeof onFetch === 'function') {
            onFetch();
        }
    }

    render() {
        const { loading } = this.props;

        return (
            <div className={classNames('scrollloader', { 'scrollloader-loading' : loading })}>
              <img src="http://misc.ttmimg.com/images/cn/cart/loading.gif" />
            </div>
        );
    }

}

ScrollLoader.propTypes = {
    loading: PropTypes.bool,
    onFetch: PropTypes.func
};
