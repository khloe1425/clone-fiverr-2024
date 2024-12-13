"use client";
import React from "react";
import InfoProfile from "./info-profile";
import GigsProfile from "./gigs-profile";
function Profile() {
  const userLogin: any = {};
  return (
    <div className="flex flex-col sm:flex-col md:flex-row  gap-4">
      {/* Phần 4 */}
      <div className="flex-[3_3_0%]  p-4 rounded-md shadow-md flex flex-col border">
        <InfoProfile />
      </div>
      {/* Phần 6 */}
      <div className="flex-[7_7_0%] rounded-md shadow-md border">
        <GigsProfile />
      </div>
    </div>
  );
}

export default Profile;
