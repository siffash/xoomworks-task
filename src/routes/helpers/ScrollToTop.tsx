import { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

class ScrollToTop extends PureComponent<RouteComponentProps<{}>> {
	componentDidUpdate(prevProps: Readonly<any>): void {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);
