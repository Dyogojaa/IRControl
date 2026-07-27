import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface Props {

    declaracaoApta: boolean;

    totalErros: number;

}

export default function AuditoriaStatusCard({

    declaracaoApta,

    totalErros,

}: Props) {

    if (declaracaoApta) {

        return (

            <Alert
                severity="success"
                icon={<CheckCircleIcon />}
                sx={{ mb: 3 }}
            >

                <AlertTitle>
                    Declaração apta
                </AlertTitle>

                Nenhuma inconsistência foi encontrada.

            </Alert>

        );

    }

    return (

        <Alert
            severity="error"
            icon={<ErrorIcon />}
            sx={{ mb: 3 }}
        >

            <AlertTitle>
                Declaração com inconsistências
            </AlertTitle>

            Foram encontrados <strong>{totalErros}</strong> erro(s)
            que precisam ser corrigidos antes do envio.

        </Alert>

    );

}