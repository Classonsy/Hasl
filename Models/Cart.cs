public class Cart
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public List<CartItem> Items { get; set; } = new List<CartItem>();
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CartItem
{
    public int Id { get; set; }
    public int CartId { get; set; }
    public int SneakerId { get; set; }
    public Sneaker Sneaker { get; set; }
    public int Quantity { get; set; }
    public string Size { get; set; }
    public string Color { get; set; }
    public decimal Price { get; set; }
}