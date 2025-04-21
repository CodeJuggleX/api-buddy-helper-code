
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { isAuthenticated, register } from "../services/authService";
import { useToast } from "@/hooks/use-toast";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password || !passwordConfirm || !employeeId) {
      setError("Пожалуйста, заполните все поля");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);
    try {
      await register({
        username,
        password,
        password_confirm: passwordConfirm,
        employee_id: Number(employeeId),
      });
      toast({
        title: "Регистрация успешна",
        description: "Вы можете войти, используя свои данные.",
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Ошибка регистрации");
      toast({
        variant: "destructive",
        title: "Ошибка регистрации",
        description: err.message || "Не удалось зарегистрироваться",
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
            Регистрация
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Создайте свой аккаунт
          </Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Имя пользователя"
            fullWidth
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <TextField
            label="ID сотрудника"
            fullWidth
            margin="normal"
            value={employeeId}
            onChange={e => setEmployeeId(e.target.value)}
            required
            type="number"
          />
          <TextField
            label="Пароль"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Подтвердите пароль"
            fullWidth
            margin="normal"
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Зарегистрироваться"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/login")}
          >
            Уже есть аккаунт? Войти
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
