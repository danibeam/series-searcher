import React from 'react';

const wrapperComponent = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      return <WrappedComponent style={styles.child} />;
    }
  }
    
  return HOC;
};

const styles = {
    child: {
        padding: '0 5% 0 5%'
    }
}

export default wrapperComponent;