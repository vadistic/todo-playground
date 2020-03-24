
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Data;
using Api.Models;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TasksController : ControllerBase
  {
    private readonly ApiContext _context;

    public TasksController(ApiContext context)
    {
      _context = context;
    }

    [HttpGet]
    public ActionResult<List<TaskModel>> GetAll() =>
        _context.Tasks.ToList();

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskModel>> GetById(long id)
    {
      var task = await _context.Tasks.FindAsync(id);

      if (task == null)
      {
        return NotFound();
      }

      return task;
    }

    [HttpPost]
    public async Task<ActionResult<TaskModel>> Create(TaskModel task)
    {
      _context.Tasks.Add(task);

      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, TaskModel task)
    {
      if (id != task.Id)
      {
        return BadRequest();
      }

      _context.Entry(task).State = EntityState.Modified;
      await _context.SaveChangesAsync();

      return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
      var product = await _context.Tasks.FindAsync(id);

      if (product == null)
      {
        return NotFound();
      }

      _context.Tasks.Remove(product);
      await _context.SaveChangesAsync();

      return NoContent();
    }
  }
}
