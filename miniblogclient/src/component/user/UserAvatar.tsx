import {
  DownOutlined,
  LoadingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout } from "../../redux/actions/authActions";
import { ROUTE } from "../../contants";

const UserAvatar: React.FC = () => {
  const { user, isAuthenticating } = useAppSelector((state) => ({
    user: state.auth.user,
    isAuthenticating: state.misc.isAuthenticating,
  }));

  const userNav = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const toggleDropdown = (e: MouseEvent) => {
    const closest = (e.target as HTMLElement).closest("div.user-nav");

    try {
      if (!closest && userNav.current?.classList.contains("user-sub-open")) {
        userNav.current.classList.remove("user-sub-open");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.addEventListener("click", toggleDropdown);
    return () => document.removeEventListener("click", toggleDropdown);
  }, []);

  const onClickNav = () => {
    userNav.current?.classList.toggle("user-sub-open");
  };

  return isAuthenticating ? (
    <div className="user-nav">
      <span>Signing Out</span>
      &nbsp;
      <LoadingOutlined />
    </div>
  ) : (
    <div
      className="user-nav"
      onClick={onClickNav}
      onKeyDown={() => {}}
      ref={userNav}
      role="button"
      tabIndex={0}
    >
      <h5 className="text-overflow-ellipsis">{user?.username}</h5>
      <div className="user-nav-img-wrapper">
        <img alt="" className="user-nav-img" src={user?.avatar} />
      </div>
      <DownOutlined style={{ fontSize: "1.2rem", marginLeft: "1rem" }} />
      <div className="user-nav-sub">
        <Link to={ROUTE.ACCOUNT} className="user-nav-sub-link">
          View Account
          <UserOutlined />
        </Link>
        <h6
          className="user-nav-sub-link margin-0 d-flex"
          onClick={() => dispatch(logout())}
          role="presentation"
        >
          Sign Out
          <LogoutOutlined />
        </h6>
      </div>
    </div>
  );
};

export default UserAvatar;
