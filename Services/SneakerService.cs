public class SneakerService : ISneakerService
{
  private readonly HASLContext _context;

  public SneakerService(HASLContext context)
  {
    _context = context;
  }

  public async Task<List<Sneaker>> GetAllSneakersAsync()
  {
    return await _context.Sneakers.ToListAsync();
  }

  public async Task<List<Sneaker>> GetPopularSneakersAsync()
  {
    return await _context.Sneakers
      .Where(s => s.IsPopular)
      .ToListAsync();
  }

  public async Task<Sneaker> GetSneakerByIdAsync(int id)
  {
    return await _context.Sneakers.FindAsync(id);
  }

  public async Task<List<Sneaker>> FilterSneakersAsync(string brand, decimal? minPrice, decimal? maxPrice)
  {
    var query = _context.Sneakers.AsQueryable();

    if (!string.IsNullOrEmpty(brand))
      query = query.Where(s => s.Brand == brand);

    if (minPrice.HasValue)
      query = query.Where(s => s.Price >= minPrice.Value);

    if (maxPrice.HasValue)
      query = query.Where(s => s.Price <= maxPrice.Value);

    return await query.ToListAsync();
  }

  public async Task<Sneaker> AddSneakerAsync(Sneaker sneaker)
  {
    sneaker.CreatedAt = DateTime.UtcNow;
    _context.Sneakers.Add(sneaker);
    await _context.SaveChangesAsync();
    return sneaker;
  }

  public async Task UpdateSneakerAsync(Sneaker sneaker)
  {
    _context.Entry(sneaker).State = EntityState.Modified;
    await _context.SaveChangesAsync();
  }

  public async Task DeleteSneakerAsync(int id)
  {
    var sneaker = await _context.Sneakers.FindAsync(id);
    if (sneaker != null)
    {
      _context.Sneakers.Remove(sneaker);
      await _context.SaveChangesAsync();
    }
  }
}