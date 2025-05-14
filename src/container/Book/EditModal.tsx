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
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import request from "../../components/config";
import type { Book } from "../../components/types";

type Props = {
  open: boolean;
  onClose: () => void;
  book: Book | null;
  updateBook: (updated: Book) => void;
};

const EditModal = ({ open, onClose, book, updateBook }: Props) => {
  const [formData, setFormData] = useState<Book | null>(book);

  useEffect(() => {
    setFormData(book);
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData) return;

    try {
      const userKey = localStorage.getItem("userKey");
      const userSecret = localStorage.getItem("userSecret");

      const url = `/books/${formData.id}`;
      const body = JSON.stringify(formData);
      const signString = "PUT" + url + body + userSecret;
      const sign = CryptoJS.MD5(signString).toString();

      const response = await request.put(url, formData, {
        headers: {
          Key: userKey,
          Sign: sign,
        },
      });

      updateBook(response.data);
      onClose();
    } catch (err) {
      console.error("Failed to update book:", err);
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onClose={onClose}>
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
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Author</label>
            <TextField
              fullWidth
              placeholder="Enter author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Pages</label>
            <TextField
              fullWidth
              placeholder="Enter pages"
              value={formData.pages}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Published</label>
            <TextField
              fullWidth
              placeholder="Enter published date"
              value={formData.published}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>ISBN</label>
            <TextField
              fullWidth
              placeholder="Enter ISBN"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Cover URL</label>
            <TextField
              fullWidth
              placeholder="Enter cover URL"
              value={formData.cover}
              onChange={handleChange}
            />
          </div>
          <FormControl fullWidth>
            <label>Status</label>
            <Select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
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
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditModal;
