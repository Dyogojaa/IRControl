import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import authService from "@/services/auth.service";

export default function ConfiguracoesPage() {

    const [openAlterarSenha, setOpenAlterarSenha] =
        useState(false);

    const [senhaAtual, setSenhaAtual] =
        useState("");

    const [novaSenha, setNovaSenha] =
        useState("");

    const [confirmacaoSenha, setConfirmacaoSenha] =
        useState("");

    const [erro, setErro] =
        useState("");

    const [sucesso, setSucesso] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    function abrirAlterarSenha() {

        setSenhaAtual("");
        setNovaSenha("");
        setConfirmacaoSenha("");

        setErro("");
        setSucesso("");

        setOpenAlterarSenha(true);
    }

    function fecharAlterarSenha() {

        if (loading)
            return;

        setOpenAlterarSenha(false);

        setSenhaAtual("");
        setNovaSenha("");
        setConfirmacaoSenha("");

        setErro("");
    }

    async function salvarAlteracaoSenha() {

        setErro("");
        setSucesso("");

        if (!senhaAtual) {

            setErro(
                "Informe a senha atual."
            );

            return;
        }

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

        if (senhaAtual === novaSenha) {

            setErro(
                "A nova senha deve ser diferente da senha atual."
            );

            return;
        }

        try {

            setLoading(true);

            await authService.alterarSenha(
                senhaAtual,
                novaSenha,
                confirmacaoSenha
            );

            setSucesso(
                "Senha alterada com sucesso."
            );

            setSenhaAtual("");
            setNovaSenha("");
            setConfirmacaoSenha("");

        }
        catch (error) {

            console.error(error);

            if (error instanceof Error) {

                setErro(error.message);

            }
            else {

                setErro(
                    "Não foi possível alterar a senha."
                );

            }

        }
        finally {

            setLoading(false);

        }
    }

    return (

        <Box sx={{ p: 3 }}>

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                }}
            >
                Configurações
            </Typography>

            <Card>

                <CardContent>

                    <Stack spacing={2}>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >

                            <LockOutlinedIcon
                                color="primary"
                            />

                            <Box>

                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                    }}
                                >
                                    Segurança
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Gerencie sua senha de acesso.
                                </Typography>

                            </Box>

                        </Box>

                        <Divider />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >

                            <Box>

                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                    }}
                                >
                                    Alterar senha
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Altere sua senha de acesso.
                                </Typography>

                            </Box>

                            <Button
                                variant="contained"
                                onClick={abrirAlterarSenha}
                            >
                                Alterar senha
                            </Button>

                        </Box>

                    </Stack>

                </CardContent>

            </Card>

            <Dialog
                open={openAlterarSenha}
                onClose={fecharAlterarSenha}
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle>
                    Alterar senha
                </DialogTitle>

                <DialogContent>

                    <Stack
                        spacing={2}
                        sx={{ mt: 1 }}
                    >

                        {erro && (

                            <Alert severity="error">
                                {erro}
                            </Alert>

                        )}

                        {sucesso && (

                            <Alert severity="success">
                                {sucesso}
                            </Alert>

                        )}

                        <TextField
                            label="Senha atual"
                            type="password"
                            fullWidth
                            value={senhaAtual}
                            disabled={loading}
                            onChange={(event) =>
                                setSenhaAtual(
                                    event.target.value
                                )
                            }
                        />

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
                            value={confirmacaoSenha}
                            disabled={loading}
                            onChange={(event) =>
                                setConfirmacaoSenha(
                                    event.target.value
                                )
                            }
                            onKeyDown={(event) => {

                                if (
                                    event.key === "Enter"
                                ) {

                                    salvarAlteracaoSenha();

                                }

                            }}
                        />

                    </Stack>

                </DialogContent>

                <DialogActions
                    sx={{ px: 3, pb: 2 }}
                >

                    <Button
                        onClick={fecharAlterarSenha}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={salvarAlteracaoSenha}
                        disabled={loading}
                    >
                        {loading
                            ? "Alterando..."
                            : "Alterar senha"}
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}