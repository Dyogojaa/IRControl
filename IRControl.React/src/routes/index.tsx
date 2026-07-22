import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import DashboardPage from "@/pages/Dashboard/DashboardPage";
import HoleritesPage from "@/pages/Holerites/HoleritesPage";
import DependentesPage from "@/pages/Dependentes/DependentesPage";
import DespesasPage from "@/pages/Despesas/DespesasPage";
import InformesPage from "@/pages/Informes/InformesPage";
import AuditoriaPage from "@/pages/Auditoria/AuditoriaPage";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/holerites"
                    element={<HoleritesPage />}
                />

                <Route
                    path="/dependentes"
                    element={<DependentesPage />}
                />

                <Route
                    path="/despesas"
                    element={<DespesasPage />}
                />

                <Route
                    path="/informes"
                    element={<InformesPage />}
                />

                <Route
                    path="/auditoria"
                    element={<AuditoriaPage />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;