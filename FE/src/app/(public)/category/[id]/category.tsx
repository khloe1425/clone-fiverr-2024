"use client";
import Loading from "@/components/ui/loading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { useLayThongTinTheoChiTietLoai } from "@/queries/useJobTitle";
import { CongViecChiTiet } from "@/schemas/job";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type Props = {};

export default function Categories({}: Props) {
  const { id } = useParams();
  const { data, isLoading, isError } = useLayThongTinTheoChiTietLoai(
    Number(id)
  );
  const arrCategory = data?.content.content as CongViecChiTiet[];
  const renderService = () => {
    return arrCategory.map((service: CongViecChiTiet, index: number) => {
      return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4" key={index}>
          <ServiceCard service={service} />
        </div>
      );
    });
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="categories">
      <div className="container">
        {/* <div className="categories-link">
          <ul className="d-flex algin-items-center gap-2">
            <li>
              <Link href="/home">Fiverr</Link>
              <span className="XQskgrQ chevron-icon-right" aria-hidden="true">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 8 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentFill"
                >
                  <path d="m.772 1.19-.619.62a.375.375 0 0 0 0 .53L5.8 8 .153 13.66a.375.375 0 0 0 0 .53l.62.62a.375.375 0 0 0 .53 0l6.544-6.545a.375.375 0 0 0 0-.53L1.302 1.19a.375.375 0 0 0-.53 0Z" />
                </svg>
              </span>
            </li>
            <li>
              <Link href="/">{arrCategory[0]?.tenLoaiCongViec}</Link>
              <span className="XQskgrQ chevron-icon-right" aria-hidden="true">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 8 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentFill"
                >
                  <path d="m.772 1.19-.619.62a.375.375 0 0 0 0 .53L5.8 8 .153 13.66a.375.375 0 0 0 0 .53l.62.62a.375.375 0 0 0 .53 0l6.544-6.545a.375.375 0 0 0 0-.53L1.302 1.19a.375.375 0 0 0-.53 0Z" />
                </svg>
              </span>
            </li>
          </ul>
        </div> */}
        <div className="categories-title">
          <span>
            {arrCategory.length > 0 && arrCategory[0]?.tenChiTietLoai}
          </span>
        </div>
        <div className="categories-topbar flex md:flex-row flex-col justify-between">
          <div className="categories-topbar-dropdown col-lg-6  d-flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-[17px] font-bold">
                  Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>All Categories</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-row justify-between w-full">
                    <span>Web Programing</span>
                    <span>(20.556)</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-row justify-between w-full">
                    <span>Data Entry</span>
                    <span>(12.256)</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-[17px] font-bold">
                  Service Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>All Categories</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-row justify-between w-full">
                    <span>Web Programing</span>
                    <span>(20.556)</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-row justify-between w-full">
                    <span>Data Entry</span>
                    <span>(12.256)</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-[17px] font-bold">
                  Seller Details
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>All Categories</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-row justify-between w-full">
                    <span>Web Programing</span>
                    <span>(20.556)</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-row justify-between w-full">
                    <span>Data Entry</span>
                    <span>(12.256)</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-[17px] font-bold">
                  Delivery Time
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>All Categories</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-row justify-between w-full">
                    <span>Web Programing</span>
                    <span>(20.556)</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-row justify-between w-full">
                    <span>Data Entry</span>
                    <span>(12.256)</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="categories-topbar-toggle flex w-full justify-around">
            <div className="toggle d-flex align-items-center m-2">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round" />
              </label>
              <span className="switch-title">Pro services</span>
            </div>
            <div className="toggle d-flex align-items-center m-2">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round" />
              </label>
              <span className="switch-title">Local sellers</span>
            </div>
            <div className="toggle d-flex align-items-center m-2">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round" />
              </label>
              <span className="switch-title">Online sellers</span>
            </div>
          </div>
        </div>
        <div className="categories-sort py-3 d-flex justify-content-between align-items-center">
          <div className="number-of-categories">
            <span className="pre-title">
              {arrCategory.length} services available
            </span>
          </div>
          <div className="sort-by">
            <span className="pre-title">Sort by</span>
            <select>
              <option defaultValue="relevace">Relevance</option>
              <option value="bestselling">Best Selling</option>
              <option value="newarrival">New Arrivals</option>
            </select>
          </div>
        </div>
        <div className="categories-services">
          <div className="row">{renderService()}</div>
        </div>
      </div>
    </section>
  );
}
