import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

export default function CriarSenhaPage() {

    const navigate = useNavigate();

    const { criarSenha } = useAuth();

    const [senha, setSenha] = useState("");

    const [confirmarSenha, setConfirmarSenha] =
        useState("");

    const [erro, setErro] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSalvar() {

        setErro("");

        if (!senha) {
            setErro("Informe a nova senha.");
            return;
        }

        if (senha.length < 8) {
            setErro(
                "A senha deve possuir pelo menos 8 caracteres."
            );
            return;
        }

        if (!confirmarSenha) {
            setErro("Confirme a nova senha.");
            return;
        }

        if (senha !== confirmarSenha) {
            setErro("As senhas não conferem.");
            return;
        }

        try {

            setLoading(true);

            await criarSenha(
                senha,
                confirmarSenha
            );

            navigate("/dashboard", {
                replace: true,
            });

        }
        catch (error) {

            console.error(error);

            if (error instanceof Error)
                setErro(error.message);
            else
                setErro("Erro ao criar a senha.");

        }
        finally {

            setLoading(false);

        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F5F7FA",
                p: 3,
            }}
        >
            <Card
                elevation={0}
                sx={{
                    width: 460,
                    borderRadius: 3,
                    boxShadow:
                        "0 20px 60px rgba(0,0,0,.08)",
                }}
            >
                <CardContent sx={{ p: 5 }}>

                    <Stack spacing={3}>

                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Criar senha
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                Para continuar, defina
                                sua senha de acesso.
                            </Typography>
                        </Box>

                        {erro && (
                            <Alert severity="error">
                                {erro}
                            </Alert>
                        )}

                        <TextField
                            label="Nova senha"
                            type="password"
                            fullWidth
                            value={senha}
                            disabled={loading}
                            onChange={(e) =>
                                setSenha(e.target.value)
                            }
                        />

                        <TextField
                            label="Confirmar senha"
                            type="password"
                            fullWidth
                            value={confirmarSenha}
                            disabled={loading}
                            onChange={(e) =>
                                setConfirmarSenha(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSalvar();
                                }
                            }}
                        />

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={loading}
                            onClick={handleSalvar}
                            sx={{
                                height: 52,
                                borderRadius: 2,
                                textTransform: "none",
                                fontSize: 16,
                                fontWeight: 600,
                            }}
                        >
                            {loading
                                ? "Salvando..."
                                : "Criar senha"}
                        </Button>

                    </Stack>

                </CardContent>
            </Card>
        </Box>
    );
}