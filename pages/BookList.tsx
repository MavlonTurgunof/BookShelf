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
import { useTheme, useMediaQuery } from "@mui/material";

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

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;
export const BookList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [EditOpenModal, setEditOpenModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //?Edit

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

  //?Delete
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

  //?GetAllBooks

  useEffect(() => {
    const getBooks = async () => {
      const key = localStorage.getItem("userKey");
      const secret = localStorage.getItem("userSecret");

      if (!key || !secret) {
        console.error("Missing auth credentials");
        return;
      }

      const method = "GET";
      const url = "/books";
      const body = "{}";
      const stringToSign = `${method}${url}${body}${secret}`;
      const sign = CryptoJS.MD5(stringToSign).toString();

      try {
        const res = await request.get("/books", {
          headers: {
            Key: key,
            Sign: sign,
          },
        });
        setBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    getBooks();
  }, []);

  const addBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  //?OpenCreateModal
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
              flexDirection={isMobile ? "column" : "row"}
              justifyContent="space-between"
              alignItems={isMobile ? "flex-start" : "center"}
              marginTop="36px"
              gap={isMobile ? 2 : 0}
            >
              <div>
                <h1
                  style={{
                    fontWeight: 700,
                    fontSize: isMobile ? "26px" : "36px",
                    color: "white",
                    fontFamily: "Mulish, sans-serif",
                  }}
                >
                  You’ve got
                  <span style={{ color: "#6200EE", paddingLeft: "10px" }}>
                    {books?.length} {books?.length === 1 ? "book" : "books"}
                  </span>
                </h1>
                <h2
                  style={{
                    color: "white",
                    fontWeight: 400,
                    fontSize: isMobile ? "16px" : "20px",
                    fontFamily: "Mulish, sans-serif",
                    marginTop: "12px",
                  }}
                >
                  Your books today
                </h2>
              </div>

              <Button
                variant="contained"
                sx={{
                  background: "#6200EE",
                  fontWeight: 500,
                  fontSize: isMobile ? "14px" : "16px",
                  paddingY: isMobile ? "8px" : "10px",
                  paddingX: isMobile ? "16px" : "24px",
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
