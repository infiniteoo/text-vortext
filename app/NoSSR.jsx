import React from "react";

function NoSSR({ children }) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? children : null;
}

export default NoSSR;
