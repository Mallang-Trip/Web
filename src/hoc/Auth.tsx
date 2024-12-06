import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __asyncAuth } from "../redux/modules/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import Loading from "../components/Loading";

/**
 * 페이지별 사용자 인증을 처리하기 위한 High Order Component
 *
 * 1. null => 아무나 출입 가능
 * 2. true => 로그인한 유저만 출입 가능
 * 3. false => 로그인한 유저는 출입 불가능
 *
 * @param SpecificComponent 페이지 컴포넌트
 * @param option 페이지별 인증 여부
 * @param adminRoute 관리자 페이지 여부
 * @returns 페이지 컴포넌트
 */
export default function Auth(
  SpecificComponent: React.FC,
  option: boolean | null,
  adminRoute = false
) {
  const AuthenticationCheck = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const user = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const checkRender = useCallback(
      (isAuth: boolean, isAdmin: boolean) => {
        if (!isAuth) {
          // 로그인 X
          if (option === true || searchParams.get("login_required")) {
            localStorage.setItem(
              "redirect",
              `${location.pathname}${location.search}`
            );
            return navigation("/login", { replace: true });
          } else {
            const delay = location.pathname === "/" ? 1000 : 0;
            setTimeout(() => setLoading(false), delay);
          }
        } else {
          // 로그인 O
          if (adminRoute && !isAdmin) return navigation("/", { replace: true });

          if (option === false) return navigation("/", { replace: true });
          else {
            const delay = location.pathname === "/" ? 1000 : 0;
            setTimeout(() => setLoading(false), delay);
          }
        }

        if (searchParams.get("login_required")) {
          searchParams.delete("login_required");
          setSearchParams(searchParams, { replace: true });
        }
      },
      [option, adminRoute, searchParams, location]
    );

    useEffect(() => {
      window.scrollTo({ top: 0 });

      if (!user.auth && localStorage.getItem("accessToken")) {
        dispatch(__asyncAuth()).then((payload) => {
          checkRender(
            payload.payload.auth,
            payload.payload.role === "ROLE_ADMIN"
          );
        });
      } else checkRender(user.auth, user.isAdmin);
    }, []);

    if (loading) return <Loading full={true} />;
    else return <SpecificComponent />;
  };

  return memo(AuthenticationCheck);
}
