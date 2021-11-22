import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.table({ name, email, password });
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/register`,
                {
                    name,
                    email,
                    password,
                }
            );
            // console.log("REGISTER RESPONSE", data);
            toast("Registration successful. Please login.");
            setLoading(false);
        } catch (err) {
            toast(err.response.data);
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">
                Register
            </h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <input
                            type="text"
                            className="form-control mb-4 p-4"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    <div className="row">
                        <input
                            type="email"
                            className="form-control mb-4 p-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="row">
                        <input
                            type="password"
                            className="form-control mb-4 p-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div className="row">
                        <button
                            type="submit"
                            className="btn btn-block btn-primary"
                            disabled={!name || !email || !password || loading}
                        >
                            {loading ? <SyncOutlined spin /> : "Submit"}
                        </button>
                    </div>
                </form>
                <p className="text-center p-3">
                    Already registered?{" "}
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Register;
