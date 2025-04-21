
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { login, isAuthenticated } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Пожалуйста, введите имя пользователя и пароль.');
      return;
    }

    setLoading(true);
    try {
      const userData = await login({ username, password });
      dispatch({ type: 'LOGIN', payload: userData });
      toast({
        title: "Вход выполнен",
        description: `Добро пожаловать, ${username}!`
      });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Неверные имя пользователя или пароль.');
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: err.message || 'Неверные имя пользователя или пароль.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={500}>
            Вход
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Войдите в свой аккаунт
          </Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Имя пользователя"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
          
          <TextField
            label="Пароль"
            fullWidth
            margin="normal"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Войти"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/register")}
          >
            Нет аккаунта? Зарегистрироваться
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
