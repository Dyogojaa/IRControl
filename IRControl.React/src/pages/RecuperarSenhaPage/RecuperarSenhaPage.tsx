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

import LoginHero from "@/components/login/LoginHero";

import authService from "@/services/auth.service";

type Etapa = 1 | 2 | 3;

export default function RecuperarSenhaPage() {

    const navigate = useNavigate();

    const [etapa, setEtapa] =
        useState<Etapa>(1);

    const [email, setEmail] =
        useState("");

    const [codigo, setCodigo] =
        useState("");

    const [novaSenha, setNovaSenha] =
        useState("");

    const [confirmacaoSenha, setConfirmacaoSenha] =
        useState("");

    const [erro, setErro] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function solicitarCodigo() {

        setErro("");

        if (!email.trim()) {

            setErro(
                "Informe seu e-mail."
            );

            return;
        }

        try {

            setLoading(true);

            await authService.esqueciSenha(
                email.trim()
            );

            setEtapa(2);

        }
        catch (error) {

            console.error(error);

            if (error instanceof Error)
                setErro(error.message);
            else
                setErro(
                    "Não foi possível solicitar a recuperação."
                );

        }
        finally {

            setLoading(false);

        }
    }

    function validarCodigo() {

        setErro("");

        if (!codigo.trim()) {

            setErro(
                "Informe o código de recuperação."
            );

            return;
        }

        setEtapa(3);
    }

    async function redefinirSenha() {

        setErro("");

        if (!novaSenha) {

            setErro(
                "Informe a nova senha."
            );

            return;
        }

        if (novaSenha.length < 8) {

            setErro(
                "A nova senha deve possuir pelo menos 8 caracteres."
            );

            return;
        }

        if (!confirmacaoSenha) {

            setErro(
                "Confirme a nova senha."
            );

            return;
        }

        if (novaSenha !== confirmacaoSenha) {

            setErro(
                "As senhas não conferem."
            );

            return;
        }

        try {

            setLoading(true);

            await authService.redefinirSenha(
                email,
                codigo,
                novaSenha,
                confirmacaoSenha
            );

            navigate(
                "/login",
                {
                    replace: true,
                    state: {
                        mensagem:
                            "Senha redefinida com sucesso. Faça login com sua nova senha.",
                    },
                }
            );

        }
        catch (error) {

            console.error(error);

            if (error instanceof Error)
                setErro(error.message);
            else
                setErro(
                    "Não foi possível redefinir a senha."
                );

        }
        finally {

            setLoading(false);

        }
    }

    function voltarLogin() {

        navigate("/login");

    }

    return (

        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "#F5F7FA",
            }}
        >

            <LoginHero />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 3,
                }}
            >

                <Card
                    elevation={0}
                    sx={{
                        width: "100%",
                        maxWidth: 460,
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
                                    Recuperar senha
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    {etapa === 1 &&
                                        "Informe seu e-mail para receber um código de recuperação."}

                                    {etapa === 2 &&
                                        "Informe o código de recuperação."}

                                    {etapa === 3 &&
                                        "Defina sua nova senha."}
                                </Typography>

                            </Box>

                            {erro && (

                                <Alert severity="error">
                                    {erro}
                                </Alert>

                            )}

                            {etapa === 1 && (

                                <TextField
                                    label="E-mail"
                                    type="email"
                                    fullWidth
                                    value={email}
                                    disabled={loading}
                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }
                                    onKeyDown={(event) => {

                                        if (
                                            event.key === "Enter"
                                        ) {
                                            solicitarCodigo();
                                        }

                                    }}
                                />

                            )}

                            {etapa === 2 && (

                                <TextField
                                    label="Código de recuperação"
                                    fullWidth
                                    value={codigo}
                                    disabled={loading}
                                    slotProps={{
                                        htmlInput: {
                                            maxLength: 6,
                                        },
                                    }}
                                    onChange={(event) =>
                                        setCodigo(
                                            event.target.value
                                                .replace(
                                                    /\D/g,
                                                    ""
                                                )
                                        )
                                    }
                                    onKeyDown={(event) => {

                                        if (
                                            event.key === "Enter"
                                        ) {
                                            validarCodigo();
                                        }

                                    }}
                                />

                            )}

                            {etapa === 3 && (

                                <>
                                    <TextField
                                        label="Nova senha"
                                        type="password"
                                        fullWidth
                                        value={novaSenha}
                                        disabled={loading}
                                        onChange={(event) =>
                                            setNovaSenha(
                                                event.target.value
                                            )
                                        }
                                    />

                                    <TextField
                                        label="Confirmar nova senha"
                                        type="password"
                                        fullWidth
                                        value={
                                            confirmacaoSenha
                                        }
                                        disabled={loading}
                                        onChange={(event) =>
                                            setConfirmacaoSenha(
                                                event.target.value
                                            )
                                        }
                                        onKeyDown={(event) => {

                                            if (
                                                event.key ===
                                                "Enter"
                                            ) {
                                                redefinirSenha();
                                            }

                                        }}
                                    />
                                </>

                            )}

                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading}
                                onClick={
                                    etapa === 1
                                        ? solicitarCodigo
                                        : etapa === 2
                                            ? validarCodigo
                                            : redefinirSenha
                                }
                                sx={{
                                    height: 52,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontSize: 16,
                                    fontWeight: 600,
                                }}
                            >
                                {loading
                                    ? "Aguarde..."
                                    : etapa === 1
                                        ? "Solicitar código"
                                        : etapa === 2
                                            ? "Continuar"
                                            : "Redefinir senha"}
                            </Button>

                            <Button
                                variant="text"
                                onClick={voltarLogin}
                                disabled={loading}
                            >
                                Voltar para o login
                            </Button>

                        </Stack>

                    </CardContent>

                </Card>

            </Box>

        </Box>
    );
}