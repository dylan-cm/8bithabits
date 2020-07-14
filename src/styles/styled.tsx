import styled, { CreateStyled } from "@emotion/styled";

export interface Theme {
  color: {
    [key: string]: string | number;
  };
  layout: {
    [key: string]: string | number;
  };
  text: {
    [key: string]: string | number;
  };
}

export default styled as CreateStyled<Theme>;
