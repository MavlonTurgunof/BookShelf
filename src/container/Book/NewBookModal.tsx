import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import request from "../../components/config";
import CryptoJS from "crypto-js";

function NewBookModal({ openModal, handleModalClose, addBook }: any) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    pages: 0,
    published: 0,
    isbn: "",
    coverUrl: "",
    status: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const key = localStorage.getItem("key");
      const secret = localStorage.getItem("secret");

      if (!key || !secret) {
        alert("Missing auth credentials. Please sign up first.");
        return;
      }

      const method = "POST";
      const url = "/books";
      const bodyStr = JSON.stringify(form);
      const signStr = method + url + bodyStr + secret;
      const sign = CryptoJS.MD5(signStr).toString();

      const response = await request.post(url, form, {
        headers: {
          Key: key,
          Sign: sign,
        },
      });

      console.log("Book created:", response.data);
      addBook(response.data);
      setForm({
        title: "",
        author: "",
        pages: 0,
        published: 0,
        isbn: "",
        coverUrl: "",
        status: "",
      });

      handleModalClose();
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Failed to create book. Please try again.");
    }
  };

  return (
    <Dialog open={openModal} onClose={handleModalClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create New</DialogTitle>
        <DialogContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            width: "100%",
            marginTop: "30px",
            gap: "35px",
          }}
        >
          <div>
            <label>Title</label>
            <TextField
              fullWidth
              placeholder="Enter title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label>Author</label>
            <TextField
              fullWidth
              placeholder="Enter author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </div>
          <div>
            <label>Pages</label>
            <TextField
              fullWidth
              placeholder="Enter pages"
              value={form.pages}
              onChange={(e) =>
                setForm({ ...form, pages: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label>Published</label>
            <TextField
              fullWidth
              placeholder="Enter published date"
              value={form.published}
              onChange={(e) =>
                setForm({ ...form, published: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label>ISBN</label>
            <TextField
              fullWidth
              placeholder="Enter ISBN"
              value={form.isbn}
              onChange={(e) => setForm({ ...form, isbn: e.target.value })}
            />
          </div>
          <div>
            <label>Cover URL</label>
            <TextField
              fullWidth
              placeholder="Enter cover URL"
              value={form.coverUrl}
              onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
            />
          </div>
          <FormControl fullWidth>
            <label>Status</label>
            <Select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              displayEmpty
              inputProps={{ "aria-label": "Status" }}
            >
              <MenuItem value="">
                <em>Choose status</em>
              </MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="reading">Reading</MenuItem>
              <MenuItem value="finished">Finished</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NewBookModal;
