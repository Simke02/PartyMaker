

namespace Models;

public class ProizvodNarudzbine
{
    [Key]
    public int ID{get; set;}
    public required int Kolicina{get; set;}
    public required double UkupnaCena{get; set;}
    public required int ProizvodID{get; set;}
}