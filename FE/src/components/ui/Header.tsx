"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomLogo from "../../assets/CustomLogo/CustomLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CategoriesMenu from "./CategoriesMenu";
import { useGetProfile } from "@/queries/useProfile";
import { toast } from "react-toastify";
import { User } from "@/schemas/profile";

// Add fontawesome icons
library.add(fas);

type Props = {
  fill?: string;
};

export default function Header({}: Props) {
  const [param, setParam] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const userProfile = useGetProfile();
  const [userLogin, setUserLogin] = useState<User>();
  useEffect(() => {
    if (userProfile.isLoading) return;
    if (userProfile.isError) {
      toast.error(
        (userProfile.error as any).content.content ||
          "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
    setUserLogin(userProfile.data?.content.content as User);
  }, [userProfile]);
  // Simulating user login state using mock data
  // const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  // Check if the user is logged in
  const renderItem = () => {
    if (!userLogin) {
      return <Link href="/login">Sign in</Link>;
    } else {
      return (
        <Link href="/profile">
          {
            <div className="flex flex-row items-center gap-2">
              <img
                src={userLogin.avatar || "https://via.placeholder.com/30"}
                alt="avatar"
                style={{ borderRadius: 50, width: 40, height: 40 }}
              />
              <p className="text my-0">{userLogin.name}</p>
            </div>
          }
        </Link>
      );
    }
  };

  const renderItem2 = () => {
    if (!userLogin) {
      return (
        <li
          className="join"
          onClick={() => {
            // Redirect to register page
            window.location.href = "/register";
          }}
        >
          <Link href="/register">Join</Link>
        </li>
      );
    } else {
      return (
        <li
          className="join d-none"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Join
        </li>
      );
    }
  };

  const renderItemNav = () => {
    if (!userLogin) {
      return (
        <Link href="/login" className="btn btn-success w-100">
          Sign in
        </Link>
      );
    } else {
      return (
        <div className="flex flex-row">
          {userLogin.avatar ? (
            <figure className="mb-0 d-flex">
              <Image
                src={userLogin.avatar}
                alt="avatar"
                className="nav_avatar"
                width={50}
                height={50}
                style={{ borderRadius: 50 }}
              />
              <div className="d-flex flex-column align-items-start mx-3">
                <h6>{userLogin.name}</h6>
                <p>{userLogin.email}</p>
              </div>
            </figure>
          ) : (
            <div className="d-flex flex-column align-items-start">
              <h6>{userLogin.name}</h6>
              <p>{userLogin.email}</p>
            </div>
          )}
        </div>
      );
    }
  };

  // Handle scroll position to change header style
  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  // Handle search form submission
  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate timeout
    window.location.href = `/result/${param}`;
  };

  // Handle search input change
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParam(e.target.value);
  };

  return (
    <>
      <header className={"header"}>
        <div className="header_wrapper">
          <div className="header_row">
            <div className="left">
              <div className="flex">
                <Link href="/" className="logo">
                  <CustomLogo color={"#404145"} />
                </Link>
              </div>
              <div className="header_search rounded-md">
                <form
                  className="search_form rounded-md"
                  onSubmit={handelSubmit}
                >
                  <div className="border h-[35px] flex items-center rounded-l-md">
                    <input
                      name="resultParam"
                      type="search"
                      className="border-none"
                      placeholder="Find Services"
                      onChange={handelChange}
                    />
                  </div>
                  <button className="btn p-2 flex items-center">
                    <span className="text-[13px]">Search</span>
                  </button>
                </form>
              </div>
            </div>
            <div className="right">
              <nav className="header_navbar">
                <ul className="ul">
                  <li className="li_1">Fiverr Business</li>
                  <li className="li_1">Explore</li>
                  <li className="li_1">
                    <FontAwesomeIcon
                      icon={["fas", "globe"]}
                      className="fa mx-1"
                    />
                    English
                  </li>
                  <li className="li_1">US$ USD</li>
                  <li className="li_1">Become a Seller</li>
                  <li>{renderItem()}</li>
                  {renderItem2()}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {/* Conditionally render CategoriesMenu based on scroll position */}
        {scrollPosition !== 0 && <CategoriesMenu />}
      </header>
    </>
  );
}
