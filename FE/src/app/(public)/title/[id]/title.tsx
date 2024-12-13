"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetDetailJobTitle } from "@/queries/useJobTitle";
import { DsChiTietLoai, DsNhomChiTietLoai, JobTitle } from "@/schemas/jobTitle";
import Loading from "@/components/ui/loading";

export default function TitleScreen() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetDetailJobTitle(Number(id));
  const jobTitleDetail = data?.content?.content[0] as JobTitle;

  if (isLoading) {
    return <Loading />;
  }

  const renderExploreContent = () => {
    return jobTitleDetail?.dsNhomChiTietLoai.map(
      (item: DsNhomChiTietLoai, index: number) => {
        return (
          <div className="item" key={index}>
            {item.hinhAnh ? (
              <img src={item.hinhAnh} alt={item.tenNhom || "Image"} />
            ) : (
              <div className="placeholder-image">Image not available</div>
            )}
            <h1>{item.tenNhom}</h1>
            {item.dsChiTietLoai.map((chiTiet: DsChiTietLoai, index: number) => {
              return (
                <p key={index}>
                  <Link href={`/category/${chiTiet.id}`}>
                    {chiTiet.tenChiTiet}
                  </Link>
                </p>
              );
            })}
          </div>
        );
      }
    );
  };

  return (
    <>
      <section className="banner-job-title">
        <div className="banner_container">
          <div className="content">
            <h1>{jobTitleDetail.tenLoaiCongViec}</h1>
            <p>Designs to make you stand out.</p>
            <button className="btn btn-outline-light">
              <span>How Fiverr Works</span>
            </button>
          </div>
        </div>
      </section>

      <section className="popular-job-title">
        <div className="container mt-lg-5 mt-sm-3 mb-lg-5 mb-sm-3">
          <h1>Most popular in {jobTitleDetail.tenLoaiCongViec}</h1>
          <div className="content">
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101614/Logo%20design_2x.png"
                alt="..."
              />
              <span>Minimalist Logo Design</span>
              <FontAwesomeIcon icon={["fas", "arrow-right"]} className="fa" />
            </div>

            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101618/Architecture%20_%20Interior%20Design_2x.png"
                alt="..."
              />
              <span>Architecture & Interior Design</span>
              <FontAwesomeIcon icon={["fas", "arrow-right"]} className="fa" />
            </div>

            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101624/Photoshop%20Editing_2x.png"
                alt="..."
              />
              <span>Image Editing</span>
              <FontAwesomeIcon icon={["fas", "arrow-right"]} className="fa" />
            </div>

            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/f_auto,q_auto/v1/attachments/generic_asset/asset/fc6c7b8c1d155625e7878252a09c4437-1653222039380/Nft%20Art%20%281%29.png"
                alt="..."
              />
              <span>NFT Art</span>
              <FontAwesomeIcon icon={["fas", "arrow-right"]} className="fa" />
            </div>

            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101623/T-Shirts%20_%20Merchandise_2x.png"
                alt="..."
              />
              <span>T-Shirts & Merchandise</span>
              <FontAwesomeIcon icon={["fas", "arrow-right"]} className="fa" />
            </div>
          </div>
        </div>
      </section>

      <section className="explore-job-title">
        <div className="container">
          <h1>Explore {jobTitleDetail.tenLoaiCongViec}</h1>
          <div className="content">
            {jobTitleDetail.dsNhomChiTietLoai ? renderExploreContent() : <></>}
          </div>
        </div>
      </section>

      <section className="related-job-title">
        <div className="container mt-lg-5 mb-lg-5 mt-md-4 mb-md-4 mt-sm-2 mb-sm-2 text-center">
          <h1 className="mb-lg-5 mb-md-4 mb-sm-2">
            Services Related To{" "}
            {jobTitleDetail.tenLoaiCongViec
              ? jobTitleDetail.tenLoaiCongViec
              : ""}
          </h1>
          <div className="tags">
            <span>Minimalist logo design</span>
            <span>Signature logo design</span>
            <span>Mascot logo design</span>
            <span>3d logo design</span>
            <span>Hand drawn logo design</span>
            <span>Vintage logo design</span>
            <span>Remove background</span>
            <span>Photo restoration</span>
            <span>Photo retouching</span>
            <span>Image resize</span>
            <span>Product label design</span>
            <span>Custom twitch overlay</span>
            <span>Custom twitch emotes</span>
            <span>Gaming logo</span>
            <span>Children book illustration</span>
          </div>
        </div>
      </section>
    </>
  );
}
