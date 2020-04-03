package graph

import (
	"fmt"
	"testing"
	"todo-lang-go/datasource"
	"todo-lang-go/graph/generated"

	"github.com/99designs/gqlgen/client"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/stretchr/testify/require"
)

func TestResolvers(t *testing.T) {
	db := datasource.CreateDatasource()
	schema := generated.NewExecutableSchema(generated.Config{Resolvers: &Resolver{DB: db}})

	c := client.New(handler.NewDefaultServer(schema))

	type Res struct {
		ID       string
		Name     string
		Content  string
		Finished bool
	}

	type CreateRes struct {
		CreateTask Res
	}

	type GetRes struct {
		Task Res
	}

	type GetManyRes struct {
		Tasks []Res
	}

	var fix CreateRes

	c.MustPost( /* GraphQL */ `
	mutation { createTask(data:{name:"Fery important"}) { id, name, content, finished } }
	`, &fix)

	t.Run("create task ok", func(t *testing.T) {
		var res CreateRes

		err := c.Post( /* GraphQL */ `
			mutation { createTask(data:{name:"Fery important"}) { id, name, content } }
		`, &res)

		require.Equal(t, "Fery important", res.CreateTask.Name)
		require.NotEmpty(t, res.CreateTask.ID)
		require.Empty(t, res.CreateTask.Content)
		require.NoError(t, err)
	})

	t.Run("create task default values", func(t *testing.T) {
		var res CreateRes

		err := c.Post( /* GraphQL */ `
			mutation { createTask(data:{name:"Fery important"}) { id, name, content, finished } }
		`, &res)

		require.False(t, res.CreateTask.Finished)
		require.NoError(t, err)
	})

	t.Run("create task fail", func(t *testing.T) {
		var res CreateRes

		err := c.Post( /* GraphQL */ `
			mutation { createTask(data:{}) { id, name, content } }
		`, &res)

		require.Error(t, err)
	})

	t.Run("get task ok", func(t *testing.T) {
		var res GetRes

		err := c.Post(fmt.Sprintf("query { task(where:{id: \"%s\"}) { id, name, content } }", fix.CreateTask.ID), &res)

		require.Exactly(t, fix.CreateTask, res.Task)
		require.NoError(t, err)
	})

	t.Run("get task fail", func(t *testing.T) {
		var res GetRes

		err := c.Post(fmt.Sprintf("query { task(where:{id: \"%s\"}) { id, name, content } }", "smth random"), &res)

		require.Error(t, err)
	})

}
