import { Box, Button, Modal, Typography } from "@mui/material";

function DeleteModal({ open, handleClose, onConfirm }: any) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          borderRadius: "12px",
          textAlign: "center",
          top: "50%",
          left: "50%",
          background: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          color="#6200EE,"
        >
          Delete
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Do you want to delete current book in the shelf??
        </Typography>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              background: "white",
              border: 1,
              borderColor: "#6200EE",
              color: "#6200EE",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            sx={{
              background: "#6200EE",
              color: "white",
            }}
          >
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
