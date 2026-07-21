import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import DashboardPage from "@/pages/Dashboard/DashboardPage";

// Futuramente
// import HoleritesPage from "@/pages/Holerites/HoleritesPage";
// import DependentesPage from "@/pages/Dependentes/DependentesPage";
// import DespesasPage from "@/pages/Despesas/DespesasPage";
// import InformesPage from "@/pages/Informes/InformesPage";
// import AuditoriaPage from "@/pages/Auditoria/AuditoriaPage";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<DashboardPage />} />

                {/* Descomente conforme as páginas forem criadas */}
                {/* <Route path="/holerites" element={<HoleritesPage />} /> */}
                {/* <Route path="/dependentes" element={<DependentesPage />} /> */}
                {/* <Route path="/despesas" element={<DespesasPage />} /> */}
                {/* <Route path="/informes" element={<InformesPage />} /> */}
                {/* <Route path="/auditoria" element={<AuditoriaPage />} /> */}
            </Route>
        </Routes>
    );
}

export default AppRoutes;