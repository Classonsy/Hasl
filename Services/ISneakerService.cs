public interface ISneakerService
{
  Task<List<Sneaker>> GetAllSneakersAsync();
  Task<List<Sneaker>> GetPopularSneakersAsync();
  Task<Sneaker> GetSneakerByIdAsync(int id);
  Task<List<Sneaker>> FilterSneakersAsync(string brand, decimal? minPrice, decimal? maxPrice);
  Task<Sneaker> AddSneakerAsync(Sneaker sneaker);
  Task UpdateSneakerAsync(Sneaker sneaker);
  Task DeleteSneakerAsync(int id);
}