// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/components/ThemeProvider";

import ForcePasswordChange from "@/components/auth/ForcePasswordChange";

// =======================
// Public Pages
// =======================
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Stores from "./pages/Stores";
import StoreDetails from "./pages/StoreDetails";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import Offers from "./pages/Offers";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

// =======================
// Admin Dashboard Pages
// (مطابقة لأسماء الملفات الموجودة فعليًا)
// =======================
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import BannersPage from "./pages/dashboard/admin/BannersPage";

// (إذا احتجتها لاحقًا — أضف Routes لها بنفس النمط)
// import CategoriesPage from "./pages/dashboard/admin/CategoriesPage";
// import OrdersManagementPage from "./pages/dashboard/admin/OrdersManagementPage";
// import UsersPage from "./pages/dashboard/admin/UsersPage";
// ... إلخ

// =======================
// Query Client (مرة واحدة)
// =======================
const queryClient = new QueryClient();

// =======================
// Guards
// =======================
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth() as any;

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth() as any;

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (isAdmin === false) return <Navigate to="/" replace />;

  return <>{children}</>;
}

// =======================
// App
// =======================
type AppProps = {
  // مهم للنشر داخل مجلد /fdert22
  basename?: string;
};

export default function App({ basename = "/" }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <CartProvider>
              <BrowserRouter basename={basename}>
                {/* إشعارات */}
                <Toaster />
                <Sonner />

                {/* (اختياري) إجبار تغيير كلمة المرور */}
                <ForcePasswordChange />

                <Routes>
                  {/* Public */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route path="/stores" element={<Stores />} />
                  <Route path="/stores/:id" element={<StoreDetails />} />

                  <Route path="/product/:id" element={<ProductDetails />} />

                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:id" element={<CategoryDetails />} />

                  <Route path="/offers" element={<Offers />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsConditions />} />

                  {/* Cart / Checkout */}
                  <Route
                    path="/cart"
                    element={
                      <RequireAuth>
                        <Cart />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <RequireAuth>
                        <Checkout />
                      </RequireAuth>
                    }
                  />

                  {/* Admin */}
                  <Route
                    path="/dashboard/admin"
                    element={
                      <RequireAdmin>
                        <AdminDashboard />
                      </RequireAdmin>
                    }
                  />
                  <Route
                    path="/dashboard/admin/banners"
                    element={
                      <RequireAdmin>
                        <BannersPage />
                      </RequireAdmin>
                    }
                  />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
