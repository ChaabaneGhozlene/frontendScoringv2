import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';

import { loginRequest } from '../../Redux/auth/actions';
import type { IRootState } from '../../Redux/store';

const LoginCover = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 🔹 Redux state auth
    const { loading, error, token } = useSelector((state: IRootState) => state.auth);

    const isRtl =
        useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    // 🔹 States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setFlag] = useState(themeConfig.locale);

    // 🔹 Set title
    useEffect(() => {
        dispatch(setPageTitle('Login Cover'));
    }, [dispatch]);

    // 🔹 Redirection après login
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    // 🔹 Langue
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };

    // 🔹 Submit
    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Email et mot de passe obligatoires');
            return;
        }

        dispatch(
  loginRequest({
    Login: email,
    Password: password,
  })
);
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img
                    src="/assets/images/auth/bg-gradient.png"
                    alt="image"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">

                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row">

                    {/* LEFT SIDE */}
                    <div className="hidden lg:flex w-full max-w-[835px] items-center justify-center bg-gradient-to-r from-pink-500 to-blue-500">
                        <div>
                            <Link to="/" className="w-48 block">
                                <img src="/assets/images/auth/logo-white.svg" alt="Logo" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex w-full flex-col items-center justify-center px-6 py-10 lg:max-w-[667px]">

                        {/* LANG */}
                        <div className="dropdown ms-auto mb-4">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                button={
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={`/assets/images/flags/${flag.toUpperCase()}.svg`}
                                            className="h-5 w-5 rounded-full"
                                        />
                                        {flag}
                                        <IconCaretDown />
                                    </div>
                                }
                            >
                                <ul>
                                    {themeConfig.languageList.map((item: any) => (
                                        <li key={item.code}>
                                            <button
                                                onClick={() => {
                                                    i18next.changeLanguage(item.code);
                                                    setLocale(item.code);
                                                }}
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </Dropdown>
                        </div>

                        {/* FORM */}
                        <div className="w-full max-w-[400px]">
                            <h1 className="text-3xl font-bold mb-4">Sign in</h1>

                            <form onSubmit={submitForm} className="space-y-5">

                                {/* EMAIL */}
                                <div>
                                    <label>Email</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            className="form-input ps-10"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span className="absolute left-3 top-3">
                                            <IconMail />
                                        </span>
                                    </div>
                                </div>

                                {/* PASSWORD */}
                                <div>
                                    <label>Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            className="form-input ps-10"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="absolute left-3 top-3">
                                            <IconLockDots />
                                        </span>
                                    </div>
                                </div>

                                {/* ERROR */}
                                {error && (
                                    <div className="text-red-500 text-sm">
                                        {error}
                                    </div>
                                )}

                                {/* BUTTON */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full"
                                >
                                    {loading ? 'Loading...' : 'Sign in'}
                                </button>
                            </form>

                            {/* REGISTER */}
                            <div className="text-center mt-5">
                                <Link to="/auth/cover-register">
                                    Create account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCover;