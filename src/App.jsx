import "./App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [Length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);  
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]\\:\";?><,./-=";

    for (let i = 0; i < Length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  }, [Length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  const copyPassword = () => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
    setOpen(true);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        textAlign: "center",
        paddingTop: "50px",
      }}
    >
      <h2 style={{ color: "grey" }}>Password Generator</h2>
      <p style={{ color: "grey" }}>Generate a secure password with customizable options</p>


      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <TextField
          value={password}
          type={showPassword ? "text" : "password"}
          inputRef={passwordRef}
          variant="outlined"
          size="small"
        />

        <IconButton
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>

        <Button
          variant="contained"
          onClick={copyPassword}
        >
          Copy
        </Button>

        <Button
          variant="contained"
          onClick={passwordGenerator}
        >
          <AutorenewIcon />
        </Button>
      </div>

      <input
        type="range"
        min="1"
        max="32"
        value={Length}
        onChange={(e) => setLength(Number(e.target.value))}
      />

      <span style={{ marginLeft: "10px" }}>
        Length: {Length}
      </span>

      <br />
      <br />

      <input
        type="checkbox"
        checked={numAllowed}
        onChange={() => setNumAllowed((prev) => !prev)}
      />
      <label> Numbers</label>

      <input
        type="checkbox"
        checked={charAllowed}
        onChange={() => setCharAllowed((prev) => !prev)}
        style={{ marginLeft: "20px" }}
      />
      <label> Characters</label>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
        >
          Password Copied!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;