import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import SectionTitle from "@/components/common/SectionTitle";

import AuditoriaToolbar
    from "@/components/dashboard/auditoria/AuditoriaToolbar";

import AuditoriaStatusCard
    from "@/components/dashboard/auditoria/AuditoriaStatusCard";

import AuditoriaResumoCards
    from "@/components/dashboard/auditoria/AuditoriaResumoCards";

import AuditoriaTable
    from "@/components/dashboard/auditoria/AuditoriaTable";

import { useAuditoria }
    from "@/hooks/useAuditoria";

export default function AuditoriaPage() {

    const anoAtual = new Date().getFullYear();

    const [ano, setAno] = useState(anoAtual);

    const {

        auditoria,

        loading,

        error,

        carregar,

    } = useAuditoria();

    useEffect(() => {

        carregar(ano);

    }, [ano, carregar]);

    return (

        <Box>

            <SectionTitle
                title="Auditoria"
                subtitle="Validação das informações da declaração."
            />

            <AuditoriaToolbar
                ano={ano}
                loading={loading}
                onAnoChange={setAno}
                onAtualizar={() => carregar(ano)}
            />

            {loading && (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        my: 5,
                    }}
                >
                    <CircularProgress />
                </Box>

            )}

            {error && (

                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                >
                    {error}
                </Alert>

            )}

            {!loading && auditoria && (

                <>

                    <AuditoriaStatusCard
                        declaracaoApta={auditoria.declaracaoApta}
                        totalErros={auditoria.totalErros}
                    />

                    <AuditoriaResumoCards
                        erros={auditoria.totalErros}
                        alertas={auditoria.totalAlertas}
                        informacoes={auditoria.totalInformacoes}
                    />

                    <AuditoriaTable
                        itens={auditoria.itens}
                        loading={loading}
                    />

                </>

            )}

        </Box>

    );

}