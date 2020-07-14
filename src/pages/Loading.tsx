import React from "react";
import styled from "@emotion/styled";
import * as Styles from "../styles";

const S: Styles.Component = Styles;
S.Loading = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Loading() {
  return (
    <S.Loading>
      <h1>Loading...</h1>
    </S.Loading>
  );
}

export default Loading;
