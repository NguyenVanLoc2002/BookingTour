import React, { useState } from "react";

function MenuManagement() {
    const user = {
        name: "Bao Truc",
        url: "https://res.cloudinary.com/doqbelkif/image/upload/v1727453521/e015a22e-fa11-4f2c-86bf-322445d957ea.png",
        gioiTinh: 1,
        ngaySinh: "06/05/2002",
        email: "baotruc123@gmail.com",
        phone: "0338030541",
        city: "Hồ Chí Minh",
      };
    return (
        <div className="text-white">

            <div class="flex items-center pb-4 pl-2">
                <img alt="User avatar" class="rounded-full" height="50"
                    src={user?.url}
                    width="50" />
                <div>
                    <div class="pl-4 font-bold">
                        {user?.name}
                    </div>
                    <div class="pl-4 text-gray-400 font-normal pr-4">
                    {user?.email}
                    </div>
                </div>
            </div>
            <nav>
                <ul>
                    <li class="mb-2 font-bold">
                        Quản lý người dùng
                    </li>
                    <li class="mb-2 font-bold cursor-pointer" id="toggle-ql-dat-tour">
                        Quản lý đặt Tour
                    </li>
                    <ul class="ml-2 hidden" id="ql-dat-tour">
                        <li class="mb-2 text-teal-500">Danh sách tour</li>
                        <li class="mb-2">Đăng tour</li>
                        <li class="mb-2">Tạo tour</li>
                    </ul>

                    <li class="mb-2 font-bold cursor-pointer" id="toggle-ql-tour">
                        Quản lý Tour
                    </li>
                    <ul class="ml-2 hidden" id="ql-tour">
                        <li class="mb-2 text-teal-500">Danh sách tour</li>
                        <li class="mb-2">Đăng tour</li>
                        <li class="mb-2">Tạo tour</li>
                    </ul>
                    <li class="mb-2 font-bold">
                        Quản lý đặt Tour
                    </li>
                    <li class="mb-2 font-bold">
                        Thống kê
                    </li>
                </ul>
            </nav>


        </div>
    );
}

export default MenuManagement;
