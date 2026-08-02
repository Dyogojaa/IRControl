import {
    Alert,
    Box,
    Button,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    Link,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import type { LoginCardProps } from "./types";

export default function LoginCard({
    login,
    senha,
    lembrarMe,
    loading,
    erro,
    onLoginChange,
    onSenhaChange,
    onLembrarMeChange,
    onEntrar,
    onEsqueceuSenha,
    onSolicitarAcesso
}: LoginCardProps) {

    return (

        <Box
            sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 6,
                backgroundColor: "#F5F7FA"
            }}
        >

            <Card
                elevation={0}
                sx={{
                    width: 520,
                    borderRadius: 4,
                    p: 5,
                    boxShadow: "0 20px 60px rgba(0,0,0,.08)"
                }}
            >

                <Stack
                    sx={{
                        gap: 3
                    }}
                >

                    <Box>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700
                            }}
                        >
                            Bem-vindo
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                mt: 1
                            }}
                        >
                            Entre com suas credenciais para acessar o sistema.
                        </Typography>

                    </Box>

                    {erro && (
                        <Alert severity="error">
                            {erro}
                        </Alert>
                    )}

                    <TextField
                        label="Login"
                        fullWidth
                        value={login}
                        onChange={(e) => onLoginChange(e.target.value)}
                        disabled={loading}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2
                            }
                        }}
                    />

                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        value={senha}
                        onChange={(e) => onSenhaChange(e.target.value)}
                        disabled={loading}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onEntrar();
                            }
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2
                            }
                        }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={lembrarMe}
                                onChange={(e) =>
                                    onLembrarMeChange(e.target.checked)
                                }
                                disabled={loading}
                            />
                        }
                        label="Manter conectado"
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={loading}
                        onClick={onEntrar}
                        sx={{
                            mt: 2,
                            height: 52,
                            borderRadius: 2,
                            background: "linear-gradient(90deg,#0F5132,#198754)",
                            textTransform: "none",
                            fontSize: 16,
                            fontWeight: 600,
                            "&:hover": {
                                background: "linear-gradient(90deg,#0C442B,#157347)"
                            }
                        }}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </Button>

                    <Divider />

                    <Stack
                        sx={{
                            gap: 1
                        }}
                    >

                        <Link
                            component="button"
                            underline="hover"
                            onClick={onEsqueceuSenha}
                        >
                            Esqueceu sua senha?
                        </Link>

                        <Link
                            component="button"
                            underline="hover"
                            onClick={onSolicitarAcesso}
                        >
                            Solicitar acesso
                        </Link>

                    </Stack>

                </Stack>

            </Card>

        </Box>

    );

}