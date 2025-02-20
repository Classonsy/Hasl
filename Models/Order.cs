public class Order
{
  public int Id { get; set; }
  public string CustomerName { get; set; }
  public string Email { get; set; }
  public string Phone { get; set; }
  public string Address { get; set; }
  public decimal TotalAmount { get; set; }
  public OrderStatus Status { get; set; }
  public List<OrderItem> Items { get; set; }
  public DateTime CreatedAt { get; set; }
}

public class OrderItem
{
  public int Id { get; set; }
  public int OrderId { get; set; }
  public int SneakerId { get; set; }
  public string Size { get; set; }
  public string Color { get; set; }
  public int Quantity { get; set; }
  public decimal Price { get; set; }
}

public enum OrderStatus
{
  Pending,
  Processing,
  Shipped,
  Delivered,
  Cancelled
}