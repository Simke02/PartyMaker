namespace Models;


public class PartyMakerContext : DbContext
{
    [Required]
    public DbSet<Administrator> Administratori{get; set;}
    [Required]
    public DbSet<AlkoholnoPice> AlkoholnaPica{get; set;}
    [Required]
    public DbSet<BezalkoholnoPice> BezalkoholnaPica{get; set;}
    [Required]
    public DbSet<Nalog> Nalozi{get; set;}
    [Required]
    public DbSet<Narudzbina> Narudzbine{get; set;}
    [Required]
    public DbSet<Pice> Pica{get; set;}
    [Required]
    public DbSet<Proizvod> Proizvodi{get; set;}
    [Required]
    public DbSet<Potrosac> Potrosaci{get; set;}
    [Required]
    public DbSet<ProizvodNarudzbine> ProizvodNarudzbine{get; set;}
    [Required]
    public DbSet<Rekviziti> Rekviziti{get; set;}
    [Required]
    public DbSet<ONama> ONama{get; set;}

    public PartyMakerContext(DbContextOptions options) : base(options)
        {

        }
}