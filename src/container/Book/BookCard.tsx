import React, { useState } from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import DeleteModal from "./DeleteModal";

interface BookCardProps {
  title: string;
  author: string;
  year: number;
  pages: number;
  published: number;
  isbn: string;
  coverUrl: string;
  status: "New" | "Reading" | "Finished";
  onDeleteClick: () => void;
  onEditClick: () => void;
}

const Card = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border: 1px;
  border-radius: 12px;
  box-shadow: 0 0 8px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  width: 100%;

  cursor: pointer;
`;

const Actions = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  right: -32px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  transition: all 0.3s;

  button {
    border: none;

    padding: 8px;
    cursor: pointer;
    color: white;
    font-size: 16px;
  }
`;

const DeleteButton = styled.button`
  border-radius: 6px 6px 6px 0;
  background-color: #ff4d4f;
`;

const EditButton = styled.button`
  border-radius: 0 6px 6px 6px;
  background-color: #6200ee;
`;

const Status = styled.span<{ status: string }>`
  background-color: ${({ status }) =>
    status === "New"
      ? "red"
      : status === "Reading"
      ? "yellow"
      : status === "Finished"
      ? "limegreen"
      : "gray"};
  color: white;
  padding: 2px 12px;
  border-radius: 8.5px;
  font-size: 16px;
  font-weight: 700;
`;

const DivSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  pages,
  published,
  isbn,
  coverUrl,
  status,
  onDeleteClick,
  onEditClick,
}) => {
  const [showActions, setShowActions] = useState(false);
  const handleCardClick = () => {
    setShowActions((prev) => !prev);
  };

  return (
    <>
      <Card onClick={handleCardClick}>
        <Actions visible={showActions}>
          <DeleteButton onClick={onDeleteClick}>
            <FaTrash />
          </DeleteButton>
          <EditButton onClick={onEditClick}>
            <FaEdit />
          </EditButton>
        </Actions>

        <h3
          style={{ fontWeight: "600px", fontSize: "16px", marginBottom: "6px" }}
        >
          {title}
        </h3>
        <div style={{ fontWeight: "400px", fontSize: "14px" }}>
          <p>
            Cover:{" "}
            <a href={coverUrl} target="_blank" rel="noreferrer">
              {coverUrl}
            </a>
          </p>
          <p>Pages: {pages}</p>
          <p>Published: {published}</p>
          <p>Isbn: {isbn}</p>
        </div>
        <br />
        <DivSection>
          <p style={{ fontWeight: "400px", fontSize: "14px" }}>{author}</p>
          <Status status={status}>{status}</Status>
        </DivSection>
      </Card>
    </>
  );
};

export default BookCard;
