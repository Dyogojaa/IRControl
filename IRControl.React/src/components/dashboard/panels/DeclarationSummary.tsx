import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";

interface Props {
    declaracaoApta: boolean;
    totalErros: number;
}

export default function DeclarationSummary({
    declaracaoApta,
    totalErros,
}: Props) {
    return (
        <Alert
            severity={declaracaoApta ? "success" : "warning"}
            variant="outlined"
            sx={{
                mb: 3,
                borderRadius: 2,
            }}
        >
            <AlertTitle
                sx={{
                    fontWeight: 700,
                }}
            >
                {declaracaoApta
                    ? "Declaração pronta para envio"
                    : "Declaração pendente"}
            </AlertTitle>

            <Typography variant="body2">
                {declaracaoApta ? (
                    <>
                        Todos os documentos obrigatórios foram conferidos.
                        <br />
                        Sua declaração está pronta para envio.
                    </>
                ) : (
                    <>
                        Foram encontradas{" "}
                        <strong>{totalErros} inconsistência(s)</strong> que
                        impedem o envio da declaração.
                        <br />
                        Revise os detalhes na Auditoria para concluir a preparação.
                    </>
                )}
            </Typography>
        </Alert>
    );
}