import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

class Shadow extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.root !== nextProps.root || this.props.children !== nextProps.children;
	}

	componentDidUpdate() {
		if (this.props.onUpdated) {
			this.props.onUpdated();
		}
	}
	render() {
		return this.props.root ? ReactDOM.createPortal(this.props.children, this.props.root) : null;
	}
}

export default class Transition extends Component {
	constructor(props) {
		super(props);
		this.onShadowUpdated = this.onShadowUpdated.bind(this);
		this.processDiff = this.processDiff.bind(this);
		this.getShadowRoot = this.getShadowRoot.bind(this);
		this.children = React.Children.toArray(props.children);
		this.state = {
			renderedChildren: this.children,
			shadowRoot: null
		}
	}

	render() {
		return (
			<div ref={e => this.rootElement = e} style={{ width: '100px' }} className="asdasd">
				{this.state.renderedChildren}
				{this.renderShadow()}
			</div>
		);
	}

	renderShadow() {
		return <Shadow root={this.state.shadowRoot} onUpdated={this.onShadowUpdated}>{this.props.children}</Shadow>
	}

	componentDidMount() {
		this.setState({ shadowRoot: this.getShadowRoot() });
	}


	onShadowUpdated() {
		this.processDiff();
	}

	getShadowRoot() {
		const root = this.rootElement.cloneNode();
		root.style.position = 'absolute';
		root.style.opacity = '0';
		root.style.pointerEvents = 'none';
		root.style.zIndex = '-10000';
		this.rootElement.parentElement.insertBefore(root, this.rootElement);
		return root;
	}

	processDiff() {
		if (this.props.children.length) {
			const actualChildren = React.Children.toArray(this.props.children);
			const renderedChildren = this.state.renderedChildren;
			
			const diff = this.getItemDiff(actualChildren, renderedChildren);

			this.setState({
				renderedChildren: [...actualChildren]
			});
		}
	}

	getItemDiff(newItems, oldItems) {
		const result = [];

		newItems.forEach((p,index) => {

		})
	}
}