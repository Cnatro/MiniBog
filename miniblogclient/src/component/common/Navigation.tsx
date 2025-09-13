import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../../contants";
import SearchBar from "./SearchBar";
import { PlusOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../hooks/hooks";
import UserAvatar from "../user/UserAvatar";
import useModal from "../../hooks/useModal";
import Modal from "./Modal";

const Navigation: React.FC = () => {
  const navbar = useRef<HTMLElement | null>(null);
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const { isOpenModal, onOpenModel, onCloseModal } = useModal();
  const nav = useNavigate();

  const scrollHandler = () => {
    if (navbar.current) {
      if (window.pageYOffset >= 70) {
        navbar.current.classList.add("is-nav-scrolled");
      } else {
        navbar.current.classList.remove("is-nav-scrolled");
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onAddPost = () => {
    setIsMenuOpen(false);

    if (!user) {
      onOpenModel();
      return;
    }
    nav(`${ROUTE.ADD_POST}`);
  };

  const onSignInClick = () => {
    onCloseModal();
    nav(ROUTE.SIGN_IN);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <nav className="navigation" ref={navbar}>
      <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
        <div className="modal-auth">
          <p className="modal-auth__message">
            You need to sign in to create a post
          </p>

          <div className="modal-auth__actions">
            <button
              className="modal-auth__btn modal-auth__btn--secondary"
              onClick={() => {
                onCloseModal();
                nav(ROUTE.HOME);
              }}
              type="button"
            >
              Continue browsing
            </button>

            <button
              className="modal-auth__btn modal-auth__btn--primary"
              onClick={onSignInClick}
              type="button"
            >
              Sign in now
            </button>
          </div>
        </div>
      </Modal>

      <div className="nav-brand">
        <Link to={ROUTE.HOME}>
          <h2>MiniBlog</h2>
        </Link>
      </div>

      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-content ${isMenuOpen ? "nav-content-open" : ""}`}>
        <SearchBar />

        <ul className="navigation-menu">
          <li className="navigation-action">
            <Link
              to={ROUTE.ADD_POST}
              className="button button-create"
              onClick={onAddPost}
            >
              <PlusOutlined />
              <span>New Post</span>
            </Link>
          </li>
          {user ? (
            <li className="navigation-menu-item">
              <UserAvatar />
            </li>
          ) : (
            <li className="navigation-action">
              {pathname !== ROUTE.SIGN_UP && (
                <Link
                  className="button button-primary"
                  to={ROUTE.SIGN_UP}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              )}
              {pathname !== ROUTE.SIGN_IN && (
                <Link
                  className="button button-outline"
                  to={ROUTE.SIGN_IN}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
