using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Collections.Generic;

public class HASLContext : DbContext
{
  public HASLContext(DbContextOptions<HASLContext> options) : base(options) { }

  public DbSet<Sneaker> Sneakers { get; set; }
  public DbSet<Order> Orders { get; set; }
  public DbSet<OrderItem> OrderItems { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    // Configure relationships
    modelBuilder.Entity<Order>()
      .HasMany(o => o.Items)
      .WithOne()
      .HasForeignKey(i => i.OrderId);

    // Configure Sneaker
    modelBuilder.Entity<Sneaker>()
      .Property(s => s.Price)
      .HasColumnType("decimal(18,2)");

    // Convert string lists to JSON
    modelBuilder.Entity<Sneaker>()
      .Property(s => s.Sizes)
      .HasConversion(
        v => System.Text.Json.JsonSerializer.Serialize(v, null),
        v => System.Text.Json.JsonSerializer.Deserialize<List<string>>(v, null));

    modelBuilder.Entity<Sneaker>()
      .Property(s => s.Colors)
      .HasConversion(
        v => System.Text.Json.JsonSerializer.Serialize(v, null),
        v => System.Text.Json.JsonSerializer.Deserialize<List<string>>(v, null));
  }
}

public class Sneaker
{
  public int Id { get; set; }
  public string Name { get; set; }
  public decimal Price { get; set; }
  public List<string> Sizes { get; set; }
  public List<string> Colors { get; set; }
}

public class Order
{
  public int Id { get; set; }
  public List<OrderItem> Items { get; set; }
}

public class OrderItem
{
  public int Id { get; set; }
  public int OrderId { get; set; }
  public Sneaker Sneaker { get; set; }
}