// const app = {}; // TODO:// express app
// const expressSwagger = require('express-swagger-generator')(app);
const expressSwagger = require("express-swagger-generator");

const swagger = {};

swagger.init = app => {
  const gen = expressSwagger(app);

  let options = {
    route: {
      url: "/swagger",
      docs: "/swagger.json"
    },
    swaggerDefinition: {
      info: {
        description: "移动护理相关API",
        title: "移动护理",
        version: "1.0.0"
      },
      //   host: "localhost:3000",
      //   basePath: "/v1",
      produces: ["application/json"],
      schemes: ["http", "https"],
      securityDefinitions: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: ""
        }
      }
    },
    // basedir: __dirname, //app absolute path
    files: [] //Path to the API handle folder
  };
  swagger.jsonData = gen(options);
  swagger.generator = gen;
};

swagger.add = (route, method, info) => {
  let routeConfig = swagger.jsonData.paths[route];
  if (!routeConfig) {
    routeConfig = {};
    swagger.jsonData.paths[route] = routeConfig;
  }

  routeConfig[method] = info;
};

/**
 * params = { name: "string"}
 */
swagger.addBody = (route, method, group, summary, params) => {
  const paramsInfo = {};
  if (Array.isArray(params)) {
    for (let key of params) {
      paramsInfo[key] = { type: "" };
    }
  } else {
    for (let key in params) {
      paramsInfo[key] = { type: params[key] };
    }
  }

  const configInfo = {
    tags: [group],
    summary: summary,
    parameters: [
      {
        in: "body",
        name: "body",
        schema: {
          type: "object",
          properties: paramsInfo
        }
      }
    ],
    responses: {
      200: { description: "JSONObject" }
    }
  };
  swagger.add(route, method, configInfo);
};
/**
 * params = { name: "string"}
 */
swagger.addQuery = (route, method, group, summary, params) => {
  const paramsInfo = [];
  if (Array.isArray(params)) {
    for (let key of params) {
      paramsInfo.push({
        name: key,
        in: "query",
        // default:"123",
        type: "string"
      });
    }
  } else {
    for (let key in params) {
      paramsInfo.push({
        name: key,
        in: "query",
        type: params[key]
      });
    }
  }

  const configInfo = {
    tags: [group],
    summary: summary,
    parameters: paramsInfo,
    responses: {
      200: { description: "JSONObject" }
    }
  };
  swagger.add(route, method, configInfo);
};

module.exports = swagger;
