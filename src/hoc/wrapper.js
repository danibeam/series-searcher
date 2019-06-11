import React from 'react';

const wrapperComponent = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      return <WrappedComponent headerStyle={styles.headerAdjust} contentStyle={styles.contentAdjust} />;
    }
  }
    
  return HOC;
};

const styles = {
    headerAdjust: {
        padding: '0 10%'
    },

    contentAdjust: {
        width: '50%'
    }
}

export default wrapperComponent;