public class OrderService : IOrderService
{
  private readonly HASLContext _context;

  public OrderService(HASLContext context)
  {
    _context = context;
  }

  public async Task<Order> CreateOrderAsync(Order order)
  {
    order.CreatedAt = DateTime.UtcNow;
    order.Status = OrderStatus.Pending;
    
    _context.Orders.Add(order);
    await _context.SaveChangesAsync();
    
    return order;
  }

  public async Task<Order> GetOrderByIdAsync(int id)
  {
    return await _context.Orders
      .Include(o => o.Items)
      .FirstOrDefaultAsync(o => o.Id == id);
  }

  public async Task UpdateOrderStatusAsync(int id, OrderStatus status)
  {
    var order = await _context.Orders.FindAsync(id);
    if (order != null)
    {
      order.Status = status;
      await _context.SaveChangesAsync();
    }
  }

  public async Task<List<Order>> GetOrdersAsync()
  {
    return await _context.Orders
      .Include(o => o.Items)
      .OrderByDescending(o => o.CreatedAt)
      .ToListAsync();
  }
}