import { Box, Button } from "@mui/material";
import { Navbar } from "../src/components/Navbar";
import styled from "styled-components";
import BookCard from "../src/container/Book/BookCard";
import Container from "../src/components/Container";
import { useEffect, useState } from "react";
import NewBookModal from "../src/container/Book/NewBookModal";
import CryptoJS from "crypto-js";
import request from "../src/components/config";
import DeleteModal from "../src/container/Book/DeleteModal";
import EditModal from "../src/container/Book/EditModal";
import type { Book } from "../src/components/types";

const mockBooks = [
  {
    id: 1,
    title: "Raspberry Pi User Guide",
    cover: "http://url.to.book.cover",
    pages: 221,
    published: 2012,
    isbn: "9781118464465",
    author: "Eben Upton / 2012",
    status: "New",
  },
  {
    id: 2,
    title: "Raspberry Pi User Guide",
    cover: "http://url.to.book.cover",
    pages: 221,
    published: 2012,
    isbn: "9781118464465",
    author: "Eben Upton / 2012",
    status: "Reading",
  },
  {
    id: 3,
    title: "Raspberry Pi User Guide",
    cover: "http://url.to.book.cover",
    pages: 221,
    published: 2012,
    isbn: "9781118464465",
    author: "Eben Upton / 2012",
    status: "Finished",
  },
];

const GridSection = styled.div`
  width: 100%;
  display: grid;
  margin-top: 30px;
  grid-template-columns: repeat(3, 1fr);
  gap: 35px;
`;

export const BookList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [EditOpenModal, setEditOpenModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  const handleEditModalOpen = (book: Book) => {
    setBookToEdit(book);
    setEditOpenModal(true);
  };

  const handleEditModalClose = () => {
    setEditOpenModal(false);
    setBookToEdit(null);
  };
  const updateBook = (updated: Book) => {
    setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const handleOpen = (bookId: number) => {
    setSelectedBookId(bookId);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
    setSelectedBookId(null);
  };

  const handleDelete = async () => {
    if (!selectedBookId) return;

    try {
      const userKey = localStorage.getItem("userKey");
      const userSecret = localStorage.getItem("userSecret");

      const method = "DELETE";
      const url = `/books/${selectedBookId}`;
      const signString = method + url + "{}" + userSecret;
      const sign = CryptoJS.MD5(signString).toString();

      await request.delete(url, {
        headers: {
          Key: userKey,
          Sign: sign,
        },
      });
      setBooks((prev) => prev.filter((book) => book.id !== selectedBookId));

      handleClose();
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await request.get("/books");
        setBooks(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  const addBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ position: "relative" }}>
          <Box p={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="36px"
            >
              <div>
                <h1
                  style={{
                    fontWeight: "700px",
                    fontSize: "36px",
                    color: "white",
                    fontFamily: "Mulish, sans-serif",
                  }}
                >
                  You’ve got
                  {books?.length > 1 ? (
                    <span style={{ color: "#6200EE", paddingLeft: "10px" }}>
                      {books?.length} books
                    </span>
                  ) : (
                    <span style={{ color: "#6200EE", paddingLeft: "10px" }}>
                      {books?.length} book
                    </span>
                  )}
                </h1>
                <h1
                  style={{
                    color: "white",
                    fontWeight: 400,
                    fontSize: "20px",
                    fontFamily: "Mulish, sans-serif",
                    marginTop: "12px",
                  }}
                >
                  Your books today
                </h1>
              </div>
              <Button
                variant="contained"
                sx={{
                  background: "#6200EE",
                  fontWeight: "500px",
                  fontSize: "16px",
                  paddingY: "10px",
                  paddingX: "24px",
                }}
                onClick={handleModalOpen}
              >
                + Create a book
              </Button>
            </Box>

            <GridSection>
              {mockBooks?.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  pages={book.pages}
                  published={book.published}
                  isbn={book.isbn}
                  coverUrl={book.cover}
                  status={book.status}
                  onDeleteClick={() => handleOpen(book.id)}
                  onEditClick={() => handleEditModalOpen(book)}
                />
              ))}
            </GridSection>
          </Box>
        </Box>
        <DeleteModal
          open={openDelete}
          handleClose={handleClose}
          onConfirm={handleDelete}
        />
        <NewBookModal
          openModal={openModal}
          handleModalClose={handleModalClose}
          addBook={addBook}
        />
        <EditModal
          open={EditOpenModal}
          onClose={handleEditModalClose}
          book={bookToEdit}
          updateBook={updateBook}
        />
      </Container>
    </>
  );
};
