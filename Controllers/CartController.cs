[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    public async Task<ActionResult<Cart>> GetCart()
    {
        var userId = User.Identity.Name ?? "anonymous"; // Replace with proper auth
        return await _cartService.GetCartAsync(userId);
    }

    [HttpPost("items")]
    public async Task<ActionResult<CartItem>> AddToCart(int sneakerId, int quantity, string size, string color)
    {
        var userId = User.Identity.Name ?? "anonymous";
        var item = await _cartService.AddToCartAsync(userId, sneakerId, quantity, size, color);
        return CreatedAtAction(nameof(GetCart), item);
    }

    [HttpDelete("items/{itemId}")]
    public async Task<IActionResult> RemoveFromCart(int itemId)
    {
        var userId = User.Identity.Name ?? "anonymous";
        await _cartService.RemoveFromCartAsync(userId, itemId);
        return NoContent();
    }

    [HttpPut("items/{itemId}")]
    public async Task<IActionResult> UpdateCartItemQuantity(int itemId, int quantity)
    {
        var userId = User.Identity.Name ?? "anonymous";
        await _cartService.UpdateCartItemQuantityAsync(userId, itemId, quantity);
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        var userId = User.Identity.Name ?? "anonymous";
        await _cartService.ClearCartAsync(userId);
        return NoContent();
    }
}