package main

import (
	"fmt"
	"net/http"
	"os"
	"todo-lang-go/datasource"
	"todo-lang-go/graph"
	"todo-lang-go/graph/generated"
	"todo-lang-go/logger"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	logger := logger.CreateLogger("main")

	fmt.Printf("@todo/lang-go app v%v\n\n", os.Getenv("VERSION"))

	// echo
	e := echo.New()
	e.HideBanner = true

	logger.Info("echo server started")

	// datasource
	db := datasource.CreateDatasource()
	defer db.Close()

	// middleware
	e.Use(middleware.Recover())
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Output: os.Stdout,
		Format: "[echo] ${protocol} => ${method} ${status} ${path} (${remote_ip}) ${latency_human}\n",
	}))

	// routes

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Welcome")
	})

	schema := generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{db}})

	graphqlHandler := handler.NewDefaultServer(schema)
	playgroundHandler := playground.Handler("GraphQL Playground", "/graphql")

	e.POST("/graphql", echo.WrapHandler(graphqlHandler))
	e.GET("/playground", echo.WrapHandler(playgroundHandler))

	// start
	port := os.Getenv("PORT")

	if port == "" {
		port = "8000"
	}

	if err := e.Start(":" + port); err != nil {
		logger.Fatal(err)
	}
}
