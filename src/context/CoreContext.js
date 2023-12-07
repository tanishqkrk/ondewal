import { createContext, useContext, useEffect, useState } from "react";

const CoreContext = createContext(null);

function CoreProvider({ children }) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <CoreContext.Provider
      value={{ response, setResponse, loading, setLoading }}
    >
      {children}
    </CoreContext.Provider>
  );
}

export default function useCore() {
  return useContext(CoreContext);
}

// export { CoreContext };
export { CoreProvider };
