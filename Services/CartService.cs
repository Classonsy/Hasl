public class CartService : ICartService
{
    private readonly HASLContext _context;

    public CartService(HASLContext context)
    {
        _context = context;
    }

    public async Task<Cart> GetCartAsync(string userId)
    {
        var cart = await _context.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Sneaker)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
        {
            cart = new Cart
            {
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        return cart;
    }

    public async Task<CartItem> AddToCartAsync(string userId, int sneakerId, int quantity, string size, string color)
    {
        var cart = await GetCartAsync(userId);
        var sneaker = await _context.Sneakers.FindAsync(sneakerId);

        if (sneaker == null)
            throw new ArgumentException("Sneaker not found");

        var existingItem = cart.Items.FirstOrDefault(i => 
            i.SneakerId == sneakerId && 
            i.Size == size && 
            i.Color == color);

        if (existingItem != null)
        {
            existingItem.Quantity += quantity;
        }
        else
        {
            var newItem = new CartItem
            {
                CartId = cart.Id,
                SneakerId = sneakerId,
                Sneaker = sneaker,
                Quantity = quantity,
                Size = size,
                Color = color,
                Price = sneaker.Price
            };
            cart.Items.Add(newItem);
        }

        cart.UpdatedAt = DateTime.UtcNow;
        cart.TotalAmount = cart.Items.Sum(i => i.Price * i.Quantity);

        await _context.SaveChangesAsync();
        return existingItem ?? cart.Items.Last();
    }

    public async Task RemoveFromCartAsync(string userId, int itemId)
    {
        var cart = await GetCartAsync(userId);
        var item = cart.Items.FirstOrDefault(i => i.Id == itemId);

        if (item != null)
        {
            cart.Items.Remove(item);
            cart.UpdatedAt = DateTime.UtcNow;
            cart.TotalAmount = cart.Items.Sum(i => i.Price * i.Quantity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task UpdateCartItemQuantityAsync(string userId, int itemId, int quantity)
    {
        var cart = await GetCartAsync(userId);
        var item = cart.Items.FirstOrDefault(i => i.Id == itemId);

        if (item != null)
        {
            item.Quantity = quantity;
            cart.UpdatedAt = DateTime.UtcNow;
            cart.TotalAmount = cart.Items.Sum(i => i.Price * i.Quantity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task ClearCartAsync(string userId)
    {
        var cart = await GetCartAsync(userId);
        cart.Items.Clear();
        cart.TotalAmount = 0;
        cart.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
    }
}