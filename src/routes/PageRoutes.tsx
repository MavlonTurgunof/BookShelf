import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../container/Login/SignIn";
import SignUp from "../container/Login/SignUp";
import { BookList } from "../../pages/BookList";
import NotFound from "../../pages/NotFound";

const PageRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/books" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
