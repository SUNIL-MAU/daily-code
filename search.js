const getRoutes = (app) => {
  let routes = [];

  // Recursively extract routes from the Express stack
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // This is a route
      routes.push(middleware.route.path);
    } else if (middleware.name === "router") {
      // This is a router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push(handler.route.path);
        }
      });
    }
  });

  return routes;
};

app.get("/api/routes", (req, res) => {
  const routes = getRoutes(app);
  res.json(routes);
});
