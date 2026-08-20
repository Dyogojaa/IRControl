import { useState } from "react";

import { Box } from "@mui/material";

import { useNavigate } from "react-router-dom";

import LoginHero from "@/components/login/LoginHero";
import LoginCard from "@/components/login/LoginCard";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [usuario, setUsuario] =
        useState("");

    const [senha, setSenha] =
        useState("");

    const [lembrarMe, setLembrarMe] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [erro, setErro] =
        useState("");

    async function handleEntrar() {

        try {

            setErro("");

            setLoading(true);

            const primeiroAcesso =
                await login(
                    usuario,
                    senha
                );

            if (primeiroAcesso) {

                navigate(
                    "/criar-senha",
                    {
                        replace: true,
                    }
                );

                return;
            }

            navigate(
                "/dashboard",
                {
                    replace: true,
                }
            );

        }
        catch (error) {

            if (error instanceof Error)
                setErro(error.message);
            else
                setErro(
                    "Erro ao realizar login."
                );

        }
        finally {

            setLoading(false);

        }
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

            <LoginCard

                login={usuario}

                senha={senha}

                lembrarMe={lembrarMe}

                loading={loading}

                erro={erro}

                onLoginChange={setUsuario}

                onSenhaChange={setSenha}

                onLembrarMeChange={
                    setLembrarMe
                }

                onEntrar={handleEntrar}

                    onEsqueceuSenha={() =>
                    navigate("/recuperar-senha")
                }

                onSolicitarAcesso={() =>
                    console.log(
                        "Solicitar acesso"
                    )
                }

            />

        </Box>
    );
}