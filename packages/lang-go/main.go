package main

import (
	"net/http"
	"os"
	"todo-lang-go/datasource"
	"todo-lang-go/graph"
	"todo-lang-go/graph/generated"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
)

func main() {
	// datasource
	db, err := datasource.Init()
	defer db.Close()
	db.LogMode(true)

	if err != nil {
		log.Fatal(err)
	}

	// echo
	e := echo.New()

	schema := generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}})
	graphqlHandler := handler.NewDefaultServer(schema)
	playgroundHandler := playground.Handler("GraphQL Playground", "/graphql")

	// middleware
	e.Use(middleware.Recover())
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Output: os.Stdout,
		Format: "[${time_rfc3339}] echo => ${method} ${status} ${path} (${remote_ip}) ${latency_human}\n",
	}))

	// logging
	log.SetLevel(log.INFO)

	// routes
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Welcome")
	})

	e.GET("/playground", echo.WrapHandler(playgroundHandler))
	e.POST("/graphql", echo.WrapHandler(graphqlHandler))

	// start
	if err = e.Start(":3000"); err != nil {
		e.Logger.Fatal(err)
	}
}
