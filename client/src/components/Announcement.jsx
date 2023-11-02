import { CardGiftcard, Close } from "@mui/icons-material";
import { Alert, Collapse, IconButton } from "@mui/material";
import { useState } from "react";

const Announcement = () => {
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
      <Alert
        icon={<CardGiftcard fontSize="inherit" />}
        action={
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
        sx={{
          mb: 2,
          fontWeight: "500",
          margin: "10px 20%",
        }}
      >
        Super Deal! Free Shipping on Orders Over $50
      </Alert>
    </Collapse>
  );
};

export default Announcement;
