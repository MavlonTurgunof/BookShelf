import React, { useState } from "react";
import styled from "styled-components";
import { AuthCard } from "../../../pages/AuthCard";
import { useNavigate } from "react-router-dom";
import request from "../../components/config";

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

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    key: "",
    secret: "",
    confirmSecret: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.secret !== formData.confirmSecret) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await request.post("/signup", {
        name: formData.name,
        email: formData.email,
        key: formData.key,
        secret: formData.secret,
      });

      localStorage.setItem("userKey", res.data.key);
      localStorage.setItem("userSecret", res.data.secret);

      navigate("/sign-in");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <Title>Sign up</Title>
      <form onSubmit={handleSubmit}>
        <Label>Name</Label>
        <Input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Label>Username (key)</Label>
        <Input
          name="key"
          type="text"
          value={formData.key}
          onChange={handleChange}
          required
        />

        <Label>Password (secret)</Label>
        <Input
          name="secret"
          type="password"
          value={formData.secret}
          onChange={handleChange}
          hasError={!!error}
          required
        />

        <Label>Confirm Password</Label>
        <Input
          name="confirmSecret"
          type="password"
          value={formData.confirmSecret}
          onChange={handleChange}
          required
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      <SmallText>
        Already signed up? <a href="/sign-in">Go to sign in.</a>
      </SmallText>
    </AuthCard>
  );
};

export default SignUp;
