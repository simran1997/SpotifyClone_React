import React, { createContext, useContext, useReducer } from "react";

//Step 1: - Create Context {Prpares dat layer for what it is going to deal with}
export const DataLayerContext = createContext(); //prepearing the datalayer

//actual datalayer that wraps the app fro which data sharing can be done
export const DataLayer = (
  { reducer, initialState, children } //here "children" is what gonna wrapped insidie the Datalayer tag(App in index.js in this example)
) => (
  //Step 2 : setting up the provider on the context which will take same value
  // which has been passed as props to the datalayer in imdex.js
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);

//the below fucntion helps in getting access to the created data layer on which we want to dispatch some action
export const useDataLayerValue = () => useContext(DataLayerContext);
