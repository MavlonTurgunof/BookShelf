import React, { useState } from "react";
import styled from "styled-components";
import { AuthCard } from "../../../pages/AuthCard";
import { useNavigate } from "react-router-dom";

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 36px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: block;
  color: black;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: ${({ hasError }) => (hasError ? "1px solid red" : "1px solid #ccc")};
  outline: none;

  &:focus {
    border-color: #6200ee;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background-color: #6200ee;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const SmallText = styled.p`
  margin-top: 1rem;
  font-size: 0.85rem;
  text-align: center;
  color: #555;

  a {
    color: #6200ee;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.75rem;
  display: block;
  margin-top: -0.75rem;
  margin-bottom: 0.75rem;
`;

const SignIn: React.FC = () => {
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      localStorage.setItem("key", key);
      localStorage.setItem("secret", secret);
      navigate("/books");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <Title>Sign in</Title>
      <form onSubmit={handleSubmit}>
        <Label>Username (key)</Label>
        <Input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
        />

        <Label>Password (secret)</Label>
        <Input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          hasError={!!error}
          required
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <SmallText>
        Don’t have an account? <a href="/sign-up">Sign up here</a>
      </SmallText>
    </AuthCard>
  );
};

export default SignIn;
