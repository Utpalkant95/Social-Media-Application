import { MdOutlineHome, MdHome } from "react-icons/md";
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { RiMessengerLine, RiMessengerFill } from "react-icons/ri";
import { IoIosNotificationsOutline, IoIosNotifications } from "react-icons/io";
import { BiMessageAltAdd, BiSolidMessageAltAdd } from "react-icons/bi";
import { IoMenuOutline,IoMenu } from "react-icons/io5";
import { IconType } from "react-icons/lib";

export interface INavItems {
  id: number;
  name: string;
  path: string;
  LV_ICON?: IconType;
  DV_ICON?: IconType;
  drawer?: boolean;
  popUp?: boolean;
  img?: string;
  dialog?: boolean
}
export const navItems: INavItems[] = [
  {
    id: 1,
    name: "home",
    path: "/",
    LV_ICON: MdOutlineHome,
    DV_ICON: MdHome,
  },
  {
    id: 2,
    name: "search",
    path: "#",
    LV_ICON: IoSearchOutline,
    DV_ICON: IoSearchSharp,
    drawer: true,
  },
  {
    id: 3,
    name: "explore",
    path: "/explore",
    LV_ICON: MdOutlineExplore,
    DV_ICON: MdExplore,
  },
  {
    id: 4,
    name: "messenger",
    path: "/direct/inbox",
    LV_ICON: RiMessengerLine,
    DV_ICON: RiMessengerFill,
  },
  {
    id: 5,
    name: "notifications",
    path: "#",
    LV_ICON: IoIosNotificationsOutline,
    DV_ICON: IoIosNotifications,
    drawer: true,
  },
  {
    id: 6,
    name: "create",
    path: "#",
    LV_ICON: BiMessageAltAdd,
    DV_ICON: BiSolidMessageAltAdd,
    drawer: false,
    dialog: true,
  },
  {
    id: 7,
    name: "profile",
    path: "/:username",
    img: "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=05qe_AeNbowQ7kNvgHD_c7I&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYASaeyU9jSGFck1ZKRnFVaMFapEUGaG7JXM_5xPDs-3MQ&oe=66C4344F&_nc_sid=328259",
  },
];

export const navItems2: INavItems[] = [
  {
    id: 999,
    name: "more",
    path: "#",
    popUp: true,
    LV_ICON: IoMenuOutline,
    DV_ICON: IoMenu,
  }
];
