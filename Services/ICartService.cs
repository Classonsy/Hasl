public interface ICartService
{
    Task<Cart> GetCartAsync(string userId);
    Task<CartItem> AddToCartAsync(string userId, int sneakerId, int quantity, string size, string color);
    Task RemoveFromCartAsync(string userId, int itemId);
    Task UpdateCartItemQuantityAsync(string userId, int itemId, int quantity);
    Task ClearCartAsync(string userId);
}