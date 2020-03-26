
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Api.Models;

namespace Api.Data
{
  public static class SeedData
  {
    public static void Initialize(ApiContext context)
    {
      if (!context.Tasks.Any())
      {
        context.Tasks.AddRange(
            new TaskModel
            {
              Name = "Finish api",
              Finished = true
            },
            new TaskModel
            {
              Name = "Deploy app",
              Content = "Can I use zeit now or netlify?",
              Finished = true
            }
        );

        context.SaveChanges();
      }
    }
  }
}
