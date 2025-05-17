let navigateFunction = null;

export const setNavigate = (navigate) => {
  navigateFunction = navigate;
};

// Function to perform navigation
export const navigate = (path, options) => {
  if (navigateFunction) {
    navigateFunction(path, options);
  } else {
    window.location.href = path;
  }
};
