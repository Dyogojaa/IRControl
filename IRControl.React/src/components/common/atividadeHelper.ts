import {
    UploadRounded,
    DownloadRounded,
    PersonAddRounded,
    EditRounded,
    DeleteRounded,
    LoginRounded,
    SettingsRounded,
    AutoAwesomeRounded
} from "@mui/icons-material";

import { green, blue, orange, red, purple } from "@mui/material/colors";

import { TipoAtividade } from "@/types/atividade";

export function obterIcone(tipo: TipoAtividade) {

    switch (tipo) {

        case TipoAtividade.Login:
            return {
                icon: LoginRounded,
                color: blue[100]
            };

        case TipoAtividade.Cadastro:
            return {
                icon: PersonAddRounded,
                color: green[100]
            };

        case TipoAtividade.Alteracao:
            return {
                icon: EditRounded,
                color: orange[100]
            };

        case TipoAtividade.Exclusao:
            return {
                icon: DeleteRounded,
                color: red[100]
            };

        case TipoAtividade.Importacao:
            return {
                icon: UploadRounded,
                color: green[100]
            };

        case TipoAtividade.Exportacao:
            return {
                icon: DownloadRounded,
                color: blue[100]
            };

        case TipoAtividade.Geracao:
            return {
                icon: AutoAwesomeRounded,
                color: purple[100]
            };

        default:

            return {
                icon: SettingsRounded,
                color: blue[100]
            };

    }

}