import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import LoginHero from "@/components/login/LoginHero";
import LoginCard from "@/components/login/LoginCard";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [lembrarMe, setLembrarMe] = useState(false);

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    async function handleEntrar() {

        try {

            setErro("");
            setLoading(true);

            await login(usuario, senha);

            navigate("/dashboard");

        }
        catch {

            setErro("Usuário ou senha inválidos.");

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
                backgroundColor: "#F5F7FA"
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
                onLembrarMeChange={setLembrarMe}
                onEntrar={handleEntrar}
                onEsqueceuSenha={() => console.log("Esqueceu senha")}
                onSolicitarAcesso={() => console.log("Solicitar acesso")}
            />

        </Box>

    );

}