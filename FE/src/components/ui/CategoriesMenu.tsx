"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useGetNavQuery } from "@/queries/useNav";
import { useRouter } from "next/navigation";

const CategoriesMenu = () => {
  // const [hoveredCategory, setHoveredCategory] = useState(null);
  const router = useRouter();
  const { data } = useGetNavQuery();
  const content = data?.content.content;
  return (
    <div className="hidden md:flex lg:flex flex-wrap relative w-full bg-white p-0">
      <Menubar className="absolute p-0 top-0 left-0 z-50 bg-white shadow-lg w-full flex-wrap">
        <div className="flex flex-wrap bg-white  border-b lg:border-none">
          {content?.map((category) => (
            <MenubarMenu key={category.id}>
              <MenubarTrigger
                className="text-md hover:bg-gray-100"
                onDoubleClick={() => {
                  router.push(`/title/${category.id}`);
                }}
              >
                <span className="text-[16px] font-thin">
                  {category.tenLoaiCongViec}
                </span>
              </MenubarTrigger>
              <MenubarContent className="block absolute z-50 bg-white shadow-lg p-3">
                {category.dsNhomChiTietLoai.map((group: any) => (
                  <div key={group.id}>
                    <MenubarItem>{group.tenNhom}</MenubarItem>
                    {group.dsChiTietLoai.length > 0 && (
                      <div className="pl-5">
                        {group.dsChiTietLoai.map((item: any) => (
                          <MenubarItem
                            key={item.id}
                            onClick={() => {
                              router.push(`/category/${item.id}`);
                            }}
                          >
                            {item.tenChiTiet}
                          </MenubarItem>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <MenubarSeparator />
                <MenubarItem>View All</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          ))}
        </div>
      </Menubar>
    </div>
  );
};

export default CategoriesMenu;
