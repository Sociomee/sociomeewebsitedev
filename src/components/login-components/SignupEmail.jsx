import React, { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'


// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

const SignupEmail = () => {
   const location = useLocation();
   const [user, setUser] = useState(location.state);

   const [email, setEmail] = useState("");
   // Snackbar Code
   const [open, setOpen] = useState(false);
   const [alert, setAlert] = useState({ sev: 'success', content: '' });

   let navigate = useNavigate();

   //  Snackbar Alert Function
   const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
   });


   // Skip Signup by email function
   const skipSignupEmail = (e) => {
      navigate('/SignupProfile', { state: user })
   }


   // Email Verification
   const emailVerification = (ev) => {
      ev.preventDefault();
      if (!email) { setOpen(true); setAlert({ sev: "error", content: "Please Enter Email Address" }); }
      else {
         navigate('/SignupProfile', { state: { user: user, email: email } })
      }

   }


   // Cancel Snackbar
   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setOpen(false);
      if (alert.sev === 'success') navigate("/SignupDetail")
   };


   return (
      <>
         <section className="login-section">
            <div className="container">
               <div className="row">
                  <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12 m-auto">
                     <div className="login-header-section">
                        <div className="logo-sec"><Link className="" to="/"><img src="/assets/images/logo.png" alt="logo" className="img-fluid" /></Link></div>
                     </div>
                     <div className="login-form">
                        <div>
                           <div className="login-title">
                              <h2>Enter Email</h2>
                           </div>
                           <div className="login-discription">
                              <h4>Please fill the form below.</h4>
                           </div>
                           <div className="form-sec">
                              <div>
                                 <form className="theme-form">
                                    <div className="form-group">
                                       <label>Enter your Email Address</label><input type="email" className="form-control" placeholder="Enter Email Address" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                                       <p className="error-input-msg d-none">**Caption text, description, error notification**</p>
                                    </div>
                                    <p className="notimsg-blk">Provide your email for better communication. </p>
                                    <div className="btn-section">
                                       <Stack spacing={2} sx={{ width: '100%' }} id="stack">
                                          <button className="btn btn-solid btn-lg" onClick={emailVerification}>CONTINUE</button>
                                          {/* Snackbar */}
                                          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1500} onClose={handleClose}>
                                             <Alert onClose={handleClose} severity={alert.sev} sx={{ width: '100%' }}>
                                                {alert.content}
                                             </Alert>
                                          </Snackbar>
                                       </Stack>
                                    </div>
                                    <div className="skip-reg-block">
                                       <a onClick={skipSignupEmail}>Skip</a>
                                    </div>
                                 </form>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export default SignupEmail
