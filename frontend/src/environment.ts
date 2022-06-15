const ENV = {
  dev: {
    API_URL: "http://localhost:5001",
  },
  prod: {
    API_URL: "http://localhost:5001",
  },
};

const getEnvVars = (env = "dev") => {
  if (env === "dev") {
    return ENV.dev;
  } else if (env === "prod") {
    return ENV.prod;
  } else {
    return ENV.dev;
  }
};

export default getEnvVars;
