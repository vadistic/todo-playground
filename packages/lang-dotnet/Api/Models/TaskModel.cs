using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
  public class TaskModel
  {
    public long Id { get; set; }

    [Required]
    public string Name { get; set; }

    public string Content { get; set; }

    [Required]
    public bool Finished { get; set; } = false;
  }
}
