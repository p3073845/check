

const jsonParser = (string) => {
    try {
        return JSON?.parse(string)
    } catch (error) {
        return null
    }
  }
  export function authHeader() {
    let user = jsonParser(localStorage.getItem("token"));
    if (user && user.token) {
      return { Authorization: "Bearer " + user.token };
    } else {
      return {};
    }
  }
  