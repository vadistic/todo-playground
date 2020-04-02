package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	model1 "todo-lang-go/datasource/model"
	"todo-lang-go/graph/generated"
	"todo-lang-go/graph/model"

	"github.com/jinzhu/copier"
)

func (r *mutationResolver) CreateTask(ctx context.Context, data model.TaskCreateDataInput) (*model1.Task, error) {
	task := &model1.Task{}

	copier.Copy(task, &data)

	if err := r.DB.Create(task).Error; err != nil {
		return nil, err
	}

	return task, nil
}

func (r *mutationResolver) UpdateTask(ctx context.Context, where model.WhereUniqueInput, data model.TaskUpdateDataInput) (*model1.Task, error) {
	task := &model1.Task{ID: where.ID}

	copier.Copy(task, &data)

	// TODO: mayn need to handle blank values because this method skips them
	// https://gorm.io/docs/update.html
	if err := r.DB.Model(&task).Updates(task).Error; err != nil {
		return nil, err
	}

	return task, nil
}

func (r *queryResolver) Task(ctx context.Context, where model.WhereUniqueInput) (*model1.Task, error) {
	// pointer to empty initalised struct usign new()
	task := new(model1.Task)

	if err := r.DB.Where(&model1.Task{ID: where.ID}).First(task).Error; err != nil {
		return nil, err
	}

	return task, nil
}

func (r *queryResolver) Tasks(ctx context.Context) ([]*model1.Task, error) {
	// arr of pointers
	tasks := []*model1.Task{}

	// pointer to arr of pointers
	if err := r.DB.Find(&tasks).Error; err != nil {
		return nil, err
	}

	// and return arr of pointers
	return tasks, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
