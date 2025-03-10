public class Sneaker
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string Brand { get; set; }
  public decimal Price { get; set; }
  public string ImageUrl { get; set; }
  public List<string> Sizes { get; set; }
  public List<string> Colors { get; set; }
  public bool IsPopular { get; set; }
  public DateTime CreatedAt { get; set; }
}