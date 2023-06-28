import React from "react";

const Compose = (props) => {
  const { providers = [], children } = props;

  return (
    <React.Fragment>
      {providers.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </React.Fragment>
  );
};

export default Compose;
