[ApiController]
[Route("api/[controller]")]
public class SneakersController : ControllerBase
{
  private readonly ISneakerService _sneakerService;

  public SneakersController(ISneakerService sneakerService)
  {
    _sneakerService = sneakerService;
  }

  [HttpGet]
  public async Task<ActionResult<List<Sneaker>>> GetSneakers()
  {
    return await _sneakerService.GetAllSneakersAsync();
  }

  [HttpGet("popular")]
  public async Task<ActionResult<List<Sneaker>>> GetPopularSneakers()
  {
    return await _sneakerService.GetPopularSneakersAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Sneaker>> GetSneaker(int id)
  {
    var sneaker = await _sneakerService.GetSneakerByIdAsync(id);
    if (sneaker == null)
      return NotFound();
    return sneaker;
  }

  [HttpGet("filter")]
  public async Task<ActionResult<List<Sneaker>>> FilterSneakers(
    [FromQuery] string brand,
    [FromQuery] decimal? minPrice,
    [FromQuery] decimal? maxPrice)
  {
    return await _sneakerService.FilterSneakersAsync(brand, minPrice, maxPrice);
  }

  [HttpPost]
  public async Task<ActionResult<Sneaker>> CreateSneaker(Sneaker sneaker)
  {
    var created = await _sneakerService.AddSneakerAsync(sneaker);
    return CreatedAtAction(nameof(GetSneaker), new { id = created.Id }, created);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateSneaker(int id, Sneaker sneaker)
  {
    if (id != sneaker.Id)
      return BadRequest();

    await _sneakerService.UpdateSneakerAsync(sneaker);
    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteSneaker(int id)
  {
    await _sneakerService.DeleteSneakerAsync(id);
    return NoContent();
  }
}