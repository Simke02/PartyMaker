namespace Models;

public class Proizvod
{
    [Key]
    public int ID{get; set;}
    public required string Naziv{get; set;}
    public required string Proizvodjac{get; set;}
    public required double Cena{get; set;}
    public string KratakOpis{get; set;}
    public required int DostupnaKolicina{get; set;}
    public required string Slika{get; set;}
    public required DateTime VremeDodavanja{get; set;}
}