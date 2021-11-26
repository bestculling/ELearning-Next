import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
    AppstoreOutlined,
    CoffeeOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu } = Menu;

const TopNav = () => {
    const [current, setCurrent] = useState("");

    const { state, dispatch } = useContext(Context);
    const { user } = state;

    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/logout`
        );
        toast(data.message);
        router.push("/login");
    };

    return (
        <Menu mode="horizontal" selectedKeys={[current]}>
            <Item
                key="/"
                onClick={(e) => setCurrent(e.key)}
                icon={<AppstoreOutlined />}
            >
                <Link href="/">
                    <a>App</a>
                </Link>
            </Item>

            {user === null && (
                <>
                    <Item
                        key="/login"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<LoginOutlined />}
                    >
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </Item>

                    <Item
                        key="/register"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<UserAddOutlined />}
                    >
                        <Link href="/register">
                            <a>Register</a>
                        </Link>
                    </Item>
                </>
            )}
            {user !== null && (
                // Due to some change in Ant design 4.16.3, style={{float: 'right'}} won't work anymore.
                //Instead, you can use style={{ marginLeft: 'auto' }}
                <SubMenu
                    icon={<CoffeeOutlined />}
                    title={user && user.name}
                    style={{ marginLeft: 'auto' }}
                >
                    <Item onClick={logout} className="float-right">
                        Logout
                    </Item>
                </SubMenu>
            )}
        </Menu>
    );
};

export default TopNav;
