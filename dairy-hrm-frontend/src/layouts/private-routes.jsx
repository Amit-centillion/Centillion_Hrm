import React from "react";

export const PrivateRoute = ({ route }) => {
  return (
    <route.layout>
      <route.component />
    </route.layout>
  );
};
