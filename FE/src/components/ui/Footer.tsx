import React from "react";
import CustomLogoFooter from "../../assets/CustomLogo/CustomLogoFooter";
import Link from "next/link"; // Import the Link component

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_warpper">
        <div className="footer_row">
          <div className="footer_top">
            <div className="item">
              <article className="article">
                <div className="title">
                  <h6>Categories</h6>
                </div>
                <div className="content">
                  <ul>
                    <li>
                      <Link href="#">Graphics &amp; Design</Link>
                    </li>
                    <li>
                      <Link href="#">Digital Marketing</Link>
                    </li>
                    <li>
                      <Link href="#">Writing &amp; Translation</Link>
                    </li>
                    <li>
                      <Link href="#">Video &amp; Animation</Link>
                    </li>
                    <li>
                      <Link href="#">Music &amp; Audio</Link>
                    </li>
                    <li>
                      <Link href="#">Programming &amp; Tech</Link>
                    </li>
                    <li>
                      <Link href="#">Data</Link>
                    </li>
                    <li>
                      <Link href="#">Business</Link>
                    </li>
                    <li>
                      <Link href="#">Lifestyle</Link>
                    </li>
                    <li>
                      <Link href="#">Sitemap</Link>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
            <div className="item">
              <article className="article">
                <div className="title">
                  <h6>About</h6>
                </div>
                <div className="content">
                  <ul>
                    <li>
                      <Link href="#">Careers</Link>
                    </li>
                    <li>
                      <Link href="#">Press &amp; News</Link>
                    </li>
                    <li>
                      <Link href="#">Partnerships</Link>
                    </li>
                    <li>
                      <Link href="#">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link href="#">Terms of Service</Link>
                    </li>
                    <li>
                      <Link href="#">Intellectual Property Claims</Link>
                    </li>
                    <li>
                      <Link href="#">Investor Relations</Link>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
            <div className="item">
              <article className="article">
                <div className="title">
                  <h6>Support</h6>
                </div>
                <div className="content">
                  <ul>
                    <li>
                      <Link href="#">Help &amp; Support</Link>
                    </li>
                    <li>
                      <Link href="#">Trust &amp; Safety</Link>
                    </li>
                    <li>
                      <Link href="#">Selling on Fiverr</Link>
                    </li>
                    <li>
                      <Link href="#">Buying on Fiverr</Link>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
            <div className="item">
              <article className="article">
                <div className="title">
                  <h6>Community</h6>
                </div>
                <div className="content">
                  <ul>
                    <li>
                      <Link href="#">Events</Link>
                    </li>
                    <li>
                      <Link href="#">Blog</Link>
                    </li>
                    <li>
                      <Link href="#">Forum</Link>
                    </li>
                    <li>
                      <Link href="#">Community Standards</Link>
                    </li>
                    <li>
                      <Link href="#">Podcast</Link>
                    </li>
                    <li>
                      <Link href="#">Affiliates</Link>
                    </li>
                    <li>
                      <Link href="#">Invite a Friend</Link>
                    </li>
                    <li>
                      <Link href="#">Become a Seller</Link>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
            <div className="item">
              <article className="article">
                <div className="title">
                  <h6>More From Fiverr</h6>
                </div>
                <div className="content">
                  <ul className="ul_5">
                    <li className="li_5">
                      <Link href="#">Fiverr Business</Link>
                    </li>
                    <li>
                      <Link href="#">Fiverr Pro</Link>
                    </li>
                    <li>
                      <Link href="#">Fiverr Studios</Link>
                    </li>
                    <li>
                      <Link href="#">Fiverr Logo Maker</Link>
                    </li>
                    <li>
                      <Link href="#">Fiverr Guides</Link>
                    </li>
                    <li>
                      <Link href="#">Get Inspired</Link>
                    </li>
                    <li>
                      <Link href="#">Fiverr Select</Link>
                    </li>
                    <li>
                      <Link href="#">ClearVoice</Link>
                      <p>Content Marketing</p>
                    </li>
                    <li>
                      <Link href="#">Fiverr Workspace</Link>
                      <p>Invoice Software</p>
                    </li>
                    <li>
                      <Link href="#">Learn</Link>
                      <p>Online Courses</p>
                    </li>
                    <li>
                      <Link href="#">Working Not Working</Link>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
          <div className="footer_bottom">
            <div className="left">
              <span className="logo_footer">
                <CustomLogoFooter />
              </span>
              <span className="copyright text-trunc">
                © Fiverr International Ltd. 2022
              </span>
            </div>
            <div className="right">
              <ul className="social">
                <li>
                  <Link href="#">
                    <span className="icon">
                      <i className="fa-brands fa-twitter" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="icon">
                      <i className="fa-brands fa-facebook" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="icon">
                      <i className="fa-brands fa-linkedin" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="icon">
                      <i className="fa-brands fa-pinterest" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="icon">
                      <i className="fa-brands fa-instagram" />
                    </span>
                  </Link>
                </li>
              </ul>
              <section className="settings">
                <div className="settings_locale">
                  <button className="selection">
                    <span>
                      <i className="fa-solid fa-globe" />
                    </span>
                    <span>English</span>
                  </button>
                </div>
                <div className="settings_locale">
                  <button className="selection">
                    <span>US$ USD</span>
                  </button>
                </div>
                <button className="button">
                  <span>
                    <i className="fa-solid fa-person" />
                  </span>
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
