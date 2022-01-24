import react from "react";

class ErrorBoundary extends react.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <p className='errCont'>Something went wrong! &#128577;</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;