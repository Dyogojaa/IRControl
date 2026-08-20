import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import { ProtectedRoute } from "@/auth/ProtectedRoute";

import LoginPage from "@/pages/login/LoginPage";
import CriarSenhaPage from "@/pages/CriarSenhaPage/CriarSenhaPage";
import ConfiguracoesPage from "@/pages/ConfiguracoesPage/ConfiguracoesPage";


import DashboardPage from "@/pages/Dashboard/DashboardPage";
import HoleritesPage from "@/pages/Holerites/HoleritesPage";
import DependentesPage from "@/pages/Dependentes/DependentesPage";
import DespesasPage from "@/pages/Despesas/DespesasPage";
import InformesPage from "@/pages/Informes/InformesPage";
import AuditoriaPage from "@/pages/Auditoria/AuditoriaPage";
import RecuperarSenhaPage  from "@/pages/RecuperarSenhaPage/RecuperarSenhaPage";

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/recuperar-senha"
                element={<RecuperarSenhaPage />}
            />

            <Route
                path="/criar-senha"
                element={
                    <ProtectedRoute>
                        <CriarSenhaPage />
                    </ProtectedRoute>
                }
            />

            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    index
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/configuracoes"
                    element={<ConfiguracoesPage />}
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
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Route>

        </Routes>

    );
}

export default AppRoutes;