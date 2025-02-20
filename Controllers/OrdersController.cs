[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
  private readonly IOrderService _orderService;

  public OrdersController(IOrderService orderService)
  {
    _orderService = orderService;
  }

  [HttpPost]
  public async Task<ActionResult<Order>> CreateOrder(Order order)
  {
    var created = await _orderService.CreateOrderAsync(order);
    return CreatedAtAction(nameof(GetOrder), new { id = created.Id }, created);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Order>> GetOrder(int id)
  {
    var order = await _orderService.GetOrderByIdAsync(id);
    if (order == null)
      return NotFound();
    return order;
  }

  [HttpPut("{id}/status")]
  public async Task<IActionResult> UpdateOrderStatus(int id, OrderStatus status)
  {
    await _orderService.UpdateOrderStatusAsync(id, status);
    return NoContent();
  }

  [HttpGet]
  public async Task<ActionResult<List<Order>>> GetOrders()
  {
    return await _orderService.GetOrdersAsync();
  }
}