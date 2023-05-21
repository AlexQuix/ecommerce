import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./containers/ProtectedRoute";
import LoaderSuspense from "./components/LoadingIndicator/LoaderSuspense";
import NavbarLayout from "./layout/NavbarLayout";
import SearchLayout from "./layout/SearchLayout";

// PAGES
const Home = lazy(()=>import("./pages/Home"));
const Categories = lazy(()=>import("./pages/Categories"));
const PageNotFound = lazy(()=>import("./pages/PageNotFound"));
const SearchPage = lazy(()=>import("./pages/Search"));
const Favorite = lazy(()=>import("./pages/Favorite"));
const ShoppingCart = lazy(()=>import("./pages/ShoppingCart"))
const Product = lazy(()=>import("./pages/Product"));
const Profile = lazy(()=>import("./pages/Profile"));
const Signin = lazy(()=>import("./pages/Signin"));
const Login = lazy(()=>import("./pages/Login"));

function App() {
  return (
    <main id="app" className="container-fluid px-0">
      <Suspense fallback={<LoaderSuspense />}>
        <Routes>
          <Route>
            <Route element={ <NavbarLayout /> }>
              <Route path="/" element={ <SearchLayout /> }>
                <Route index element={ <Home /> }/>
                <Route path="/search" element={<SearchPage />}/>
              </Route>
              
              <Route path="/categories" element={ <Categories /> }/>
              <Route path="/profile" element={
                  	                  <ProtectedRoute>
                                          <Profile />
                                      </ProtectedRoute>
                                    }/>
              <Route path="/product/:id" element={<Product />}/>
              <Route path="/favorite" element={
                                        <ProtectedRoute>
                                          <Favorite />
                                        </ProtectedRoute>
                                      }/>
              <Route path="/shopping-cart" element={
                                            <ProtectedRoute>
                                              <ShoppingCart />
                                            </ProtectedRoute>
                                          }/>
            </Route>
    
    
            <Route path="/signin" element={<Signin />}/>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />}/>
          </Route>
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
