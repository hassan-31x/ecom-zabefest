'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const RegisterForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Name should be in alphabets')
      .required('Name is required'),
    phoneNumber: Yup.string()
      .matches(/^03[0-9]{9}$/, 'Invalid phone number format')
      .required('Phone Number is required'),
    cnicNumber: Yup.string()
      .matches(/^[0-9]{13}$/, 'CNIC must be exactly 13 digits')
      .required('CNIC Number is required'),
    bankAccountNumber: Yup.string()
      .matches(/^[0-9]{16}$/, 'Bank Account must be exactly 16 digits')
      .required('Bank Account Number is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
      password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /[A-Z]/,
      'Password must contain at least one uppercase letter'
    ),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      // Simulate async submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(data); // Handle form submission here
      alert('Registration successful!');
      reset(); // Clear form after successful submission
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 5,
          padding: 4,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: 4,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter your name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="e.g., 03123456789"
            {...register('phoneNumber')}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
          <TextField
            label="CNIC Number"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter your CNIC number"
            {...register('cnicNumber')}
            error={!!errors.cnicNumber}
            helperText={errors.cnicNumber?.message}
          />
          <TextField
            label="Bank Account Number"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter your bank account number"
            {...register('bankAccountNumber')}
            error={!!errors.bankAccountNumber}
            helperText={errors.bankAccountNumber?.message}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter your email address"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitting}
            sx={{ marginTop: 2 }}
          >
            {submitting ? 'Submitting...' : 'Register'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterForm;
