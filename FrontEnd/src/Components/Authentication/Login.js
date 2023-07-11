import { Box, Button, InputBase } from '@material-ui/core'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../Firebase';


const Login = ({handleClose}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
    p={3}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    <InputBase
      variant="outlined"
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
      style={{border: "1px solid white", borderRadius: 10, height: 50, color: 'white', paddingLeft: 10,}}
    />
    <InputBase
      variant="outlined"
      placeholder='Enter Password'
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      style={{border: "1px solid white", borderRadius: 10, height: 50, color: 'white', paddingLeft: 10,}}
    />
    <Button
      variant="contained"
      size="large"
      onClick={handleSubmit}
      style={{ backgroundColor: "#EEBC1D" }}
    >
      Login
    </Button>
  </Box>

  )
}

export default Login