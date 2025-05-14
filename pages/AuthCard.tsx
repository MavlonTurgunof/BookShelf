import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 430px;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    border-radius: 8px;
  }
`;

interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <CardWrapper>
      <Card>{children}</Card>
    </CardWrapper>
  );
};
