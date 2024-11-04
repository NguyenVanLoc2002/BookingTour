import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  { key: 'users', label: 'Quản lý người dùng' },
  { key: 'tours',label: 'Quản lý tour',children: [
    { key: 'dsTour', label: 'Danh sách tour' },
    { key: 'dangTour', label: 'Đăng tour' },
    { key: 'taoTour', label: 'Tạo tour' },
  ], },
  { key: 'bookings', label: 'Quản lý đặt Tour',
    children: [
      { key: 'huyTour', label: 'Danh sách yêu cầu hủy tour' },
      { key: 'tourRieng', label: 'Danh sách đặt tour riêng' },
    ],
   },
  {
    key: 'thongKe',
    label: 'Thống kê',
    children: [
      { key: 'tkDoanhThu', label: 'Thống kê doanh thu' },
      { key: 'tkTour', label: 'Thống kê tour' },
    ],
  }
];


interface User {
  name: string;
  url: string;
  gioiTinh: number;
  ngaySinh: string;
  email: string;
  phone: string;
  city: string;
}

const MenuManagement: React.FC = () => {
  const user: User = {
    name: "Bao Truc",
    url: "https://res.cloudinary.com/doqbelkif/image/upload/v1727453521/e015a22e-fa11-4f2c-86bf-322445d957ea.png",
    gioiTinh: 1,
    ngaySinh: "06/05/2002",
    email: "baotruc123@gmail.com",
    phone: "0338030541",
    city: "Hồ Chí Minh",
  };
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="text-black w-[100%]">
      <div className="flex items-center pb-4 pl-2">
        <img
          alt="User avatar"
          className="rounded-full"
          height="50"
          src={user.url}
          width="50"
        />
        <div>
          <div className="pl-4 font-bold">{user.name}</div>
          <div className="pl-4 text-gray-400 font-normal pr-4">
            {user.email}
          </div>
        </div>
      </div>
      
      <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
    </div>
  );
};

export default MenuManagement;
