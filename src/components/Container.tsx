import React, { ReactNode } from "react";
import styled from "styled-components";

interface ContainerProps {
  children: ReactNode;
}

const StyledContainer = styled.div`
  max-width: 1320px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
