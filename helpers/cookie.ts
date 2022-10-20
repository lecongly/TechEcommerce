import Cookies from "js-cookie";

enum TokenExpiration {
  Access = 5 * 60 * 1000,
  Refresh = 7 * 24 * 60 * 60 * 1000,
}

export function setTokensToCookie(access: string, refresh?: string) {
  Cookies.set("access", access, {
    expires: new Date().getTime() + TokenExpiration.Access,
    secure: true,
    sameSite: "none",
  });
  Cookies.set(
    "accessExpires",
    `${new Date().getTime() + TokenExpiration.Access}`
  );
  if (refresh)
    Cookies.set("refresh", refresh, {
      expires: new Date().getTime() + TokenExpiration.Refresh,
      secure: true,
      sameSite: "none",
    });
}
export function clearTokens() {
  Cookies.remove("access");
  Cookies.remove("accessExpires");
  Cookies.remove("refresh");
}
