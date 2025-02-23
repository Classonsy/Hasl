public interface IOrderService
{
  Task<Order> CreateOrderAsync(Order order);
  Task<Order> GetOrderByIdAsync(int id);
  Task UpdateOrderStatusAsync(int id, OrderStatus status);
  Task<List<Order>> GetOrdersAsync();
}